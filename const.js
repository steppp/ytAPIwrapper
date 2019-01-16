var path = require('path');
var fs = require('fs');

module.exports.constants = Object.freeze({
    YTTOKEN: '???',
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
    LIST_MTHUMB: this.SEARCH_MTHUMB
})
