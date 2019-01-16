const axios = require('axios');
const constants = require('./const.js').constants;

module.exports.searchByTitle = function(text, configuration) {
    return videosListSearch('title', text, configuration);
};

module.exports.relatedToVideoId = function(videoId, configuration) {
    return videosListSearch('related', videoId, configuration);
};

module.exports.getVideoDetails = function(videoIds, configuration) {
    var skipFields = configuration && configuration.hasOwnProperty('fields');
    var parameters = genericParametersBuilder(defaultDetailsConfiguration,
                                                configuration,
                                                skipFields);
    parameters.key = constants.YTTOKENNAME;
    parameters.id = videoIds.join(',');

    return new Promise(function(resolve, reject) {
        axios.get(constants.YTVIDEODETAILS_BASEURL, {
            params: parameters
        }).then(function(response) {
            var items = response.data.items;
            var paths = skipFields ? configuration['fields'] :
                defaultSearchConfiguration['fields'];
            items = moveToTopLevel(items, paths, function(leaf, key, destObj) {
                if (thumbnailsSize.indexOf(key) != -1)
                    key = 'thumbnails_' + key;
                destObj[key] = leaf;
            });
            resolve(items);
        }).catch(function(error) {
            /* TODO: Handle error */
        });
    });
};

function genericParametersBuilder(defaults, config, skipFields) {
    /*
     * skip copying the fields from the default configuration if a
     * custom configuration is provided and there are some fields
     * to be converted
     *
     * NOTE: buildParametersFromConfig does not completely override
     * the previous params list, it just updates that
     */
    var parameters = {};
    parameters = buildParametersFromConfig(parameters,
                                            defaults,
                                            skipFields);
    if (config) {
        parameters = buildParametersFromConfig(parameters, config);
    }

    return parameters;
}

// TODO: Edit this method too to conform to the new version of this wrapper
module.exports.getCommentThreads = function(id, resCount, partialRes) {
    if (!resCount)
        resCount = constants.YTCOMMENTTHREAD_RESCOUNT;

    var parameters = {
        maxResults: resCount,
        part: constants.YTCOMMENTTHREAD_PART
    };

    parameters.videoId = id;

    var baseUrl = constants.YTCOMMENTTHREAD_BASEURL;

    if (partialRes)
        parameters.fields = constants.YTCOMMENTTHREAD_FIELDS;

    parameters.key = constants.YTTOKENNAME;
    return axios.get(baseUrl, {
        params: parameters
    });
}

function videosListSearch(searchType, text, configuration) {
    var skipFields = configuration != undefined  && configuration.hasOwnProperty('fields');
    var parameters = genericParametersBuilder(defaultSearchConfiguration,
                                                configuration,
                                                skipFields);
    if (searchType == 'title')
        parameters.q = text;
    else if (searchType == 'related')
        parameters.relatedToVideoId = text;
    else /* throw error */ ;

    parameters.key = constants.YTTOKEN;
    console.log(parameters);

    return new Promise(function(resolve, reject) {
        axios.get(constants.YTSEARCH_BASEURL, {
            params: parameters
        }).then(function(response) {
            var items = response.data.items;
            var paths = skipFields ? configuration['fields'] :
                defaultSearchConfiguration['fields'];
            items = moveToTopLevel(items, paths, function(leaf, key, destObj) {
                if (thumbnailsSize.indexOf(key) != -1)
                    key = 'thumbnails_' + key;
                destObj[key] = leaf;
            });
            resolve(items);
        }).catch(function(error) {
            /* TODO: Handle error */
        });
    });
}

function moveToTopLevel(items, paths) {
    var formattedObj = {};
    var formattedList = [];
    var adaptedPaths = adaptPaths(paths);
    var copy = {};

    if (!copyFunction) {
        copy = function(leaf, key) {
            formattedObj[key] = leaf;
        };
    } else {
        copy = function(leaf, key) {
            copyFunction(leaf, key, formattedObj);
        };
    }

    for (var i = 0; i < adaptedPaths.length; i++) {
        var formattedObj = {};
        visitTreePaths(items[i], adaptedPaths, copy);

        formattedList.push(formattedObj);
    }

    return formattedList;
}

function adaptPaths(paths) {
    var adapted = [];

    for (var i = 0; i < paths.length; i++) {
        var firstBarIndex = paths[i].indexOf("/");
        adapted.push(paths[i].slice(firstBarIndex + 1));
    }

    return adapted;
}

function buildParametersFromConfig(parameters, config, skipFields = false) {
    for (var k in config) {
        if ('fields' == k) {
            if (!skipFields)
                parameters[k] = buildFieldsString(searchFieldsTree, config[k]);
        } else parameters[k] = config[k];
    }

    return parameters;
}

function buildFieldsString(fieldsTree, fieldsList) {
    var tree = visitTreePaths(fieldsTree, fieldsList, () => {
        return true;
    });

    // TODO: create a cache to call less frequently the following function
    return createFieldsString(tree);
}

function visitTreePaths(tree, paths, onLeafReached) {
    // deep copy of the object
    var treeCopy = JSON.parse(JSON.stringify(tree));

    // set to true all the "paths" that must be inserted in the fields string
    for (var i = 0; i < paths.length; i++) {
        var subtree = treeCopy;
        var steps = path[i].split("/");
        for (var j = 0; j < steps.length - 1; j++)
            subtree = subtree[steps[j]];

        // apply the function to the leaf
        subtree[steps.last()] = onLeafReached(subtree[steps.last()], steps.last());
    }

    return treeCopy;
}

function createFieldsString(obj) {
    fields = "";

    for (var k in obj) {
        var value = obj[k];
        if ("boolean" === typeof value) {
            if (value)
                fields += k + ",";
        } else {
            if (hasTrueInSubtree(value)) {
                fields += k + "(" + createFields(value) + "),";
            }
        }
    }

    if (fields.length > 0)
        fields = fields.slice(0, -1);

    return fields;
}

function hasTrueInSubtree(obj) {
    for (var k in obj) {
        var value = obj[k];
        if ("boolean" === typeof value) {
            if (value) return true;
        } else {
            if (hasTrueInSubtree(value))
                return true;
        }
    }

    return false;
}

searchFieldsTree = Object.freeze({
    items: {
        id: {
            videoId: false
        },
        snippet: {
            title: false,
            description: false,
            thumbnails: {
                medium: false
            }
        }
    }
});

defaultSearchConfiguration = {
    fields: [ constants.SEARCH_ID, constants.SEARCH_TITLE ],
    maxResults: constants.YTSEARCH_RESCOUNT,
    topicId: constants.YTSEARCH_TOPICID,
    part: constants.YTSEARCH_PART,
    type: constants.YTSEARCH_TYPE,
    videoCategoryId: constants.YTSEARCH_MUSICCATID
}

listFieldsTree = Object.freeze({
    items: {
        id: false,
        snippet: {
            title: false,
            description: false,
            thumbnails: {
                medium: false
            }
        }
    }
});

defaultDetailsConfiguration = {
    fields: [ constants.LIST_TITLE ],
    part: constants.YTVIDEODETAILS_PART,
    fields: constants.YTVIDEODETAILS_FIELDS
}
