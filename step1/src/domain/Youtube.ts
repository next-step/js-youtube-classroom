export interface YoutubeSearchResult {
  nextPageToken?: string;
  prevPageToken?: string;
  etag: string;
  kind: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: 10
  }
  items: YoutubeClipItem[];
}

export interface YoutubeClipItem {
  kind: 'youtube#searchResult';
  etag: string;
  id: {
    kind: "youtube#video";
    videoId: string;
  },
  snippet: {
    publishedAt: Date;
    channelId: string;
    title: string;
    description: string;
    thumbnails: Record<'default' | 'medium' | 'high', YoutubeClipThumbnail>;
    channelTitle: string;
    liveBroadcastContent: string;
    publishTime: Date;
  }
}

export interface YoutubeClipThumbnail {
  url: string;
  width: number;
  height: number;
}

/*
{
  "kind": "youtube#searchListResponse",
  "etag": "iyC8q5WpKs_hGUZfg7oIhFA3DhE",
  "nextPageToken": "CAUQAA",
  "regionCode": "KR",
  "pageInfo": {
  "totalResults": 10380,
    "resultsPerPage": 5
},
  "items": [
  {
    "kind": "youtube#searchResult",
    "etag": "_t9PvvItysl0cqmDNSTI_F8toVQ",
    "id": {
      "kind": "youtube#video",
      "videoId": "AfRHl3soLDg"
    },
    "snippet": {
      "publishedAt": "2017-01-19T15:23:32Z",
      "channelId": "UCS3W5vFugqi6QcsoAIHcMpw",
      "title": "Javascript - How To Get And Set Input Text Value In JS  [ with source code ]",
      "description": "Set And Get Value From Input Text Using Javascript Source Code: http://1bestcsharp.blogspot.com/2017/01/javascript-get-and-set-input-text-value.html ...",
      "thumbnails": {
        "default": {
          "url": "https://i.ytimg.com/vi/AfRHl3soLDg/default.jpg",
          "width": 120,
          "height": 90
        },
        "medium": {
          "url": "https://i.ytimg.com/vi/AfRHl3soLDg/mqdefault.jpg",
          "width": 320,
          "height": 180
        },
        "high": {
          "url": "https://i.ytimg.com/vi/AfRHl3soLDg/hqdefault.jpg",
          "width": 480,
          "height": 360
        }
      },
      "channelTitle": "1BestCsharp blog",
      "liveBroadcastContent": "none",
      "publishTime": "2017-01-19T15:23:32Z"
    }
  },
  {
    "kind": "youtube#searchResult",
    "etag": "Es9mgvDh3n2BygvW_dcbjURufzY",
    "id": {
      "kind": "youtube#video",
      "videoId": "eUXSKIvVEiw"
    },
    "snippet": {
      "publishedAt": "2009-10-30T11:36:48Z",
      "channelId": "UCU0qLUyF1lz5pYhYPAAHkZw",
      "title": "[object HTMLInputElement]",
      "description": "Audiotype feat. Martina - Lullaby (Rol Madness & C.j. Wega)",
      "thumbnails": {
        "default": {
          "url": "https://i.ytimg.com/vi/eUXSKIvVEiw/default.jpg",
          "width": 120,
          "height": 90
        },
        "medium": {
          "url": "https://i.ytimg.com/vi/eUXSKIvVEiw/mqdefault.jpg",
          "width": 320,
          "height": 180
        },
        "high": {
          "url": "https://i.ytimg.com/vi/eUXSKIvVEiw/hqdefault.jpg",
          "width": 480,
          "height": 360
        }
      },
      "channelTitle": "WebsTest",
      "liveBroadcastContent": "none",
      "publishTime": "2009-10-30T11:36:48Z"
    }
  },
  {
    "kind": "youtube#searchResult",
    "etag": "fIYJgUYZk3YtUO59V1CZ6Db9kVw",
    "id": {
      "kind": "youtube#video",
      "videoId": "43BvKMNLc1g"
    },
    "snippet": {
      "publishedAt": "2021-04-04T08:10:43Z",
      "channelId": "UCzr7hwUo4s7fvgvMMeIr4Ug",
      "title": "Nagyszombati vigília szentmise",
      "description": "Segítség lelki áldozáshoz (hosszabb imádság): https://www.piarista.hu/h%C3%ADr/seg%C3%ADts%C3%A9g_lelki_%C3%A1ldoz%C3%A1shoz.",
      "thumbnails": {
        "default": {
          "url": "https://i.ytimg.com/vi/43BvKMNLc1g/default.jpg",
          "width": 120,
          "height": 90
        },
        "medium": {
          "url": "https://i.ytimg.com/vi/43BvKMNLc1g/mqdefault.jpg",
          "width": 320,
          "height": 180
        },
        "high": {
          "url": "https://i.ytimg.com/vi/43BvKMNLc1g/hqdefault.jpg",
          "width": 480,
          "height": 360
        }
      },
      "channelTitle": "Piarista Templom Váci",
      "liveBroadcastContent": "none",
      "publishTime": "2021-04-04T08:10:43Z"
    }
  },
  {
    "kind": "youtube#searchResult",
    "etag": "p-zSmbgITiE35qCFBj1cLHT5AgU",
    "id": {
      "kind": "youtube#video",
      "videoId": "v2K81G77q5M"
    },
    "snippet": {
      "publishedAt": "2010-01-03T19:04:16Z",
      "channelId": "UCU0qLUyF1lz5pYhYPAAHkZw",
      "title": "[object HTMLInputElement]",
      "description": "I will finish the Mix and upload a high quality mp3.",
      "thumbnails": {
        "default": {
          "url": "https://i.ytimg.com/vi/v2K81G77q5M/default.jpg",
          "width": 120,
          "height": 90
        },
        "medium": {
          "url": "https://i.ytimg.com/vi/v2K81G77q5M/mqdefault.jpg",
          "width": 320,
          "height": 180
        },
        "high": {
          "url": "https://i.ytimg.com/vi/v2K81G77q5M/hqdefault.jpg",
          "width": 480,
          "height": 360
        }
      },
      "channelTitle": "WebsTest",
      "liveBroadcastContent": "none",
      "publishTime": "2010-01-03T19:04:16Z"
    }
  },
  {
    "kind": "youtube#searchResult",
    "etag": "fFobLHbOstj3BOCiyfId-R0MoUY",
    "id": {
      "kind": "youtube#video",
      "videoId": "eJL7W7mhypU"
    },
    "snippet": {
      "publishedAt": "2013-07-23T21:48:52Z",
      "channelId": "UCU0qLUyF1lz5pYhYPAAHkZw",
      "title": "[object HTMLInputElement]",
      "description": "I was there in my usual white FLG t-shirt.... I have no words...",
      "thumbnails": {
        "default": {
          "url": "https://i.ytimg.com/vi/eJL7W7mhypU/default.jpg",
          "width": 120,
          "height": 90
        },
        "medium": {
          "url": "https://i.ytimg.com/vi/eJL7W7mhypU/mqdefault.jpg",
          "width": 320,
          "height": 180
        },
        "high": {
          "url": "https://i.ytimg.com/vi/eJL7W7mhypU/hqdefault.jpg",
          "width": 480,
          "height": 360
        }
      },
      "channelTitle": "WebsTest",
      "liveBroadcastContent": "none",
      "publishTime": "2013-07-23T21:48:52Z"
    }
  }
]
}
*/
