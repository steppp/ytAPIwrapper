var path = require('path');
var fs = require('fs');
const keys_dict = JSON.parse(fs.readFileSync(path.join(__dirname,"api.key"),"utf-8")).keys;
const lastfmapi = JSON.parse(fs.readFileSync(path.join(__dirname,'lastfmapi.json'),'utf8'));
const discogsCredentials = JSON.parse(fs.readFileSync(path.join(__dirname,"discogsapi.json"),'utf-8'));

module.exports.constants = Object.freeze({
    YTTOKEN: keys_dict.yt_key,
    YTSEARCH_RESCOUNT: 25,
    YTSEARCH_BASEURL: 'https://www.googleapis.com/youtube/v3/search',
    YTSEARCH_FIELDS: 'items(id/videoId,snippet(title,thumbnails/medium))',
    YTSEARCH_MUSICCATID: 10,
    YTSEARCH_TYPE: 'video',
    YTSEARCH_PART: 'snippet',
    YTSEARCH_TOPICID: '/m/04rlf',

    YTVIDEODETAILS_BASEURL: 'https://www.googleapis.com/youtube/v3/videos',
    YTVIDEODETAILS_FIELDS: 'items(contentDetails/duration,snippet(channelTitle,description,publishedAt,tags,title),statistics(commentCount,dislikeCount,likeCount,viewCount),topicDetails/topicCategories)',
    YTVIDEODETAILS_PART: 'snippet,contentDetails,statistics,topicDetails',

    YTCOMMENTTHREAD_BASEURL: 'https://www.googleapis.com/youtube/v3/commentThreads',
    YTCOMMENTTHREAD_RESCOUNT: 30,
    YTCOMMENTTHREAD_FIELDS: 'items(id,snippet(topLevelComment(id,snippet(authorDisplayName,authorProfileImageUrl,likeCount,publishedAt,textDisplay,textOriginal,updatedAt)),totalReplyCount)),nextPageToken',
    YTCOMMENTTHREAD_PART: 'snippet',

    YTCOMMENT_BASEURL: 'https://www.googleapis.com/youtube/v3/comments',
    YTCOMMENT_FIELDS: 'items(snippet(authorDisplayName,authorProfileImageUrl,likeCount,publishedAt,textDisplay,textOriginal,updatedAt,videoId,viewerRating)),nextPageToken',
    YTCOMMENT_RESCOUNT: 20,
    YTCOMMENT_PART: 'snippet',

    /* YouTube search list api fields filtering constants */
    SEARCH_ID: 'items/id/videoId',
    SEARCH_TITLE: 'items/snippet/title',
    SEARCH_DESC: 'items/snippet/description',
    SEARCH_MTHUMB: 'items/snippet/thumbnails/medium',

    /* YouTube list api fields filtering constants */
    LIST_ID: 'items/id',
    LIST_TITLE: this.SEARCH_TITLE,
    LIST_DESC: this.SEARCH_DESC,
    LIST_MTHUMB: this.SEARCH_MTHUMB,

    USERDATAFOLDER_PATH: './backend/users',
    GSHEETSTOKEN: keys_dict.gsheets_key,

    MAX_ALBUM_COUNT_ARTIST_SIMILARITY: 6,
    MAX_TRACK_COUNT_ARTIST_SIMILARITY: 4,
    MAX_SUB_ARTIST_BANDSIMILARITY: 3,
    MAX_ARTIST_COUNT_GENRE_SIMILARITY: 10,

    LASTFM_KEY: lastfmapi.key,
    LASTFM_SECRET: lastfmapi.secret,

    DISCOGS_KEY: discogsCredentials.key,
    DISCOGS_SECRET: discogsCredentials.secret,

    LOCAL_ABSOLUTE_PATH: path.join(__dirname,'popularity_lists/local_absolute.json'),

    MEDIUM: 0,
    HIGH: 1,
    STANDARD: 2,
    MAXRES: 3,
    DEFAULT: 4,

    LOCAL_POPULARITY: "LocalPopularity",
    GENRE_SIMILARITY: "GenreSimilarity",

    SITE_NUM: "1848",
    BASE_URL:"site1848.tw.cs.unibo.it",

    INDEX_PATH: 'static/html/index.html',
})
