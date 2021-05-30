const MAX_RESULT = 10;
const PART = "snippet";

const getAPI = async (keyword: string, lastKey: string) => {
  try {
    const url = `${process.env.API_URL}?part=${PART}&maxResults=${MAX_RESULT}&q=${keyword}&key=${process.env.API_KEY}&pageToken=${lastKey}`;
    const response = await fetch(url);
    const data = await response.json();
    return { datas: data.items, lastKey: data.nextPageToken };
  } catch (error) {
    console.log(error);
  }
};

export default getAPI;

/*[
  {
    "kind": "youtube#searchResult",
    "etag": "goZZ_68QjO6W7jaBjfyUF95mN9I",
    "id": {
        "kind": "youtube#video",
        "videoId": "PkKnp4SdE-w"
    },
    "snippet": {
        "publishedAt": "2021-05-10T09:02:33Z",
        "channelId": "UCEf_Bc-KVd7onSeifS3py9g",
        "title": "NCT DREAM 엔시티 드림 &#39;맛 (Hot Sauce)&#39; MV",
        "description": "[Tracklist] 01 맛 (Hot Sauce) 02 Diggity 03 고래 (Dive Into You) 04 우리의 계절 (My Youth) 05 Rocket 06 Countdown (3, 2, 1) 07 ANL 08 주인공 (Irreplaceable) 09 ...",
        "thumbnails": {
            "default": {
                "url": "https://i.ytimg.com/vi/PkKnp4SdE-w/default.jpg",
                "width": 120,
                "height": 90
            },
            "medium": {
                "url": "https://i.ytimg.com/vi/PkKnp4SdE-w/mqdefault.jpg",
                "width": 320,
                "height": 180
            },
            "high": {
                "url": "https://i.ytimg.com/vi/PkKnp4SdE-w/hqdefault.jpg",
                "width": 480,
                "height": 360
            }:
        },
        "channelTitle": "SMTOWN",
        "liveBroadcastContent": "none",
        "publishTime": "2021-05-10T09:02:33Z"
    }
},
{
    "kind": "youtube#searchResult",
    "etag": "ZMtRCyFCPi9PdblnyTr5HExbdIg",
    "id": {
        "kind": "youtube#video",
        "videoId": "Augjjfu-Msw"
    },
    "snippet": {
        "publishedAt": "2021-05-29T04:03:36Z",
        "channelId": "UCK8sTMQLS1qt6l6M75EYbAw",
        "title": "[NCT] 무대하기전 엔시티 모음",
        "description": "nct127#nct#wayv#nct#엔시티#엔시티127#엔시티드림#웨이션브이.",
        "thumbnails": {
            "default": {
                "url": "https://i.ytimg.com/vi/Augjjfu-Msw/default.jpg",
                "width": 120,
                "height": 90
            },
            "medium": {
                "url": "https://i.ytimg.com/vi/Augjjfu-Msw/mqdefault.jpg",
                "width": 320,
                "height": 180
            },
            "high": {
                "url": "https://i.ytimg.com/vi/Augjjfu-Msw/hqdefault.jpg",
                "width": 480,
                "height": 360
            }
        },
        "channelTitle": "이수만 남소시켜줘.",
        "liveBroadcastContent": "none",
        "publishTime": "2021-05-29T04:03:36Z"
    }
},
{
    "kind": "youtube#searchResult",
    "etag": "1yzPQvKa3QS6NvW0vBKZZzgXecM",
    "id": {
        "kind": "youtube#video",
        "videoId": "FeI0oTTAHe8"
    },
    "snippet": {
        "publishedAt": "2021-05-26T12:00:13Z",
        "channelId": "UCTQVIXvcHrR9jYoJ6qaBAow",
        "title": "[아싸! 너너댄스] 엔시티 드림에서 제일 잘 삐치는 &#39;삐돌이&#39; 멤버는 누구?! | NCT DREAM - 맛 (Hot Sauce) (ENG SUB)",
        "description": "[아싸! 너너댄스] 엔시티 드림에서 제일 잘 삐치는 '삐돌이' 멤버는 누구?! | NCT DREAM - 맛 (Hot Sauce) 14분 내내 16825데시벨인 아이돌이 있다?! 모두들 예능신 ...",
        "thumbnails": {
            "default": {
                "url": "https://i.ytimg.com/vi/FeI0oTTAHe8/default.jpg",
                "width": 120,
                "height": 90
            },
            "medium": {
                "url": "https://i.ytimg.com/vi/FeI0oTTAHe8/mqdefault.jpg",
                "width": 320,
                "height": 180
            },
            "high": {
                "url": "https://i.ytimg.com/vi/FeI0oTTAHe8/hqdefault.jpg",
                "width": 480,
                "height": 360
            }
        },
        "channelTitle": "M2",
        "liveBroadcastContent": "none",
        "publishTime": "2021-05-26T12:00:13Z"
    }
},
{
    "kind": "youtube#searchResult",
    "etag": "nsrPyEOs3fheKBFIWFHN8p1VevY",
    "id": {
        "kind": "youtube#video",
        "videoId": "dP3CbgJvQr0"
    },
    "snippet": {
        "publishedAt": "2021-05-21T12:41:11Z",
        "channelId": "UCq_QvKPfLs5OoEAzfT--hlg",
        "title": "[NCT] 엔시티 웃긴 영상을 모아봤다",
        "description": "",
        "thumbnails": {
            "default": {
                "url": "https://i.ytimg.com/vi/dP3CbgJvQr0/default.jpg",
                "width": 120,
                "height": 90
            },
            "medium": {
                "url": "https://i.ytimg.com/vi/dP3CbgJvQr0/mqdefault.jpg",
                "width": 320,
                "height": 180
            },
            "high": {
                "url": "https://i.ytimg.com/vi/dP3CbgJvQr0/hqdefault.jpg",
                "width": 480,
                "height": 360
            }
        },
        "channelTitle": "7드림카페_알바생",
        "liveBroadcastContent": "none",
        "publishTime": "2021-05-21T12:41:11Z"
    }
},
{
    "kind": "youtube#searchResult",
    "etag": "JovrmQJjsJT9L5est7NHT1yOeRs",
    "id": {
        "kind": "youtube#video",
        "videoId": "jWChcmFva3E"
    },
    "snippet": {
        "publishedAt": "2021-05-23T11:00:14Z",
        "channelId": "UCXURHJRGr4-EB3l87kcbElw",
        "title": "NCT DREAM 엔시티 드림 &#39;맛 (Hot Sauce)&#39; Dance Practice",
        "description": "#NCTDREAM​​​ #HotSauce #맛_HotSauce #NCTDREAM_맛_HotSauce​​ #NCTDREAM_HotSauce​​​ #NCTDREAM_맛.",
        "thumbnails": {
            "default": {
                "url": "https://i.ytimg.com/vi/jWChcmFva3E/default.jpg",
                "width": 120,
                "height": 90
            },
            "medium": {
                "url": "https://i.ytimg.com/vi/jWChcmFva3E/mqdefault.jpg",
                "width": 320,
                "height": 180
            },
            "high": {
                "url": "https://i.ytimg.com/vi/jWChcmFva3E/hqdefault.jpg",
                "width": 480,
                "height": 360
            }
        },
        "channelTitle": "NCT DREAM",
        "liveBroadcastContent": "none",
        "publishTime": "2021-05-23T11:00:14Z"
    }
},
{
    "kind": "youtube#searchResult",
    "etag": "ACUZ2WZSLrQSzu2A0pPBezp6uDY",
    "id": {
        "kind": "youtube#video",
        "videoId": "GLWOiMUm_x0"
    },
    "snippet": {
        "publishedAt": "2021-05-18T09:00:15Z",
        "channelId": "UCTQVIXvcHrR9jYoJ6qaBAow",
        "title": "[릴레이댄스] NCT DREAM(엔시티 드림) - 맛 (Hot Sauce) (4K)",
        "description": "[릴레이댄스] 엔시티 드림 - 맛 (Hot Sauce) [Relay Dance] NCT DREAM - 맛 (Hot Sauce) @: 거기 맛있나요? ‍  : 진짜 맛있습니다 미슐랭 7스타 드림이들 춤선이 ...",
        "thumbnails": {
            "default": {
                "url": "https://i.ytimg.com/vi/GLWOiMUm_x0/default.jpg",
                "width": 120,
                "height": 90
            },
            "medium": {
                "url": "https://i.ytimg.com/vi/GLWOiMUm_x0/mqdefault.jpg",
                "width": 320,
                "height": 180
            },
            "high": {
                "url": "https://i.ytimg.com/vi/GLWOiMUm_x0/hqdefault.jpg",
                "width": 480,
                "height": 360
            }
        },
        "channelTitle": "M2",
        "liveBroadcastContent": "none",
        "publishTime": "2021-05-18T09:00:15Z"
    }
},
{
    "kind": "youtube#searchResult",
    "etag": "mwDZawvpuyteMlApc2J4SLtzSfY",
    "id": {
        "kind": "youtube#video",
        "videoId": "oPFWQn11BEQ"
    },
    "snippet": {
        "publishedAt": "2021-05-27T17:00:02Z",
        "channelId": "UC7R5RQ8GgBgcauu7mKCpqGw",
        "title": "[NCT 재민 해찬] 엔시티 드림 아니었어도 짱친이었을 것 같은 조합 1위🐰🐻 (내가 정함)",
        "description": "",
        "thumbnails": {
            "default": {
                "url": "https://i.ytimg.com/vi/oPFWQn11BEQ/default.jpg",
                "width": 120,
                "height": 90
            },
            "medium": {
                "url": "https://i.ytimg.com/vi/oPFWQn11BEQ/mqdefault.jpg",
                "width": 320,
                "height": 180
            },
            "high": {
                "url": "https://i.ytimg.com/vi/oPFWQn11BEQ/hqdefault.jpg",
                "width": 480,
                "height": 360
            }
        },
        "channelTitle": "지퍼",
        "liveBroadcastContent": "none",
        "publishTime": "2021-05-27T17:00:02Z"
    }
},
{
    "kind": "youtube#searchResult",
    "etag": "xeTgGrw6KFyVji1Dc9jPhCrFDfk",
    "id": {
        "kind": "youtube#video",
        "videoId": "0IpbvXVbBYA"
    },
    "snippet": {
        "publishedAt": "2020-12-04T11:01:43Z",
        "channelId": "UCEf_Bc-KVd7onSeifS3py9g",
        "title": "NCT 2020 엔시티 2020 &#39;RESONANCE&#39; MV",
        "description": "#NCT2020 #RESONANCE #NCT2020_RESONANCE NCT 2020 엔시티 2020 'RESONANCE' MV ℗ SM Entertainment.",
        "thumbnails": {
            "default": {
                "url": "https://i.ytimg.com/vi/0IpbvXVbBYA/default.jpg",
                "width": 120,
                "height": 90
            },
            "medium": {
                "url": "https://i.ytimg.com/vi/0IpbvXVbBYA/mqdefault.jpg",
                "width": 320,
                "height": 180
            },
            "high": {
                "url": "https://i.ytimg.com/vi/0IpbvXVbBYA/hqdefault.jpg",
                "width": 480,
                "height": 360
            }
        },
        "channelTitle": "SMTOWN",
        "liveBroadcastContent": "none",
        "publishTime": "2020-12-04T11:01:43Z"
    }
},
{
    "kind": "youtube#searchResult",
    "etag": "Hks4w7YKE0_WuESzs4Eq5hdHDik",
    "id": {
        "kind": "youtube#video",
        "videoId": "ArtxvtJdr0o"
    },
    "snippet": {
        "publishedAt": "2021-05-20T13:45:05Z",
        "channelId": "UCTQVIXvcHrR9jYoJ6qaBAow",
        "title": "[MPD직캠] 엔시티 드림 1위 앵콜 직캠 4K &#39;맛 (Hot Sauce)&#39; (NCT DREAM FanCam No.1 Encore) | @MCOUNTDOWN_2021.5.20",
        "description": "[MPD직캠] 엔시티 드림 - 맛 (Hot Sauce) 1위 앵콜 [MPD FanCam] NCT DREAM - 맛 (Hot Sauce) No.1 Encore @MCOUNTDOWN_2021.5.20 #NCTDREAM #MPD ...",
        "thumbnails": {
            "default": {
                "url": "https://i.ytimg.com/vi/ArtxvtJdr0o/default.jpg",
                "width": 120,
                "height": 90
            },
            "medium": {
                "url": "https://i.ytimg.com/vi/ArtxvtJdr0o/mqdefault.jpg",
                "width": 320,
                "height": 180
            },
            "high": {
                "url": "https://i.ytimg.com/vi/ArtxvtJdr0o/hqdefault.jpg",
                "width": 480,
                "height": 360
            }
        },
        "channelTitle": "M2",
        "liveBroadcastContent": "none",
        "publishTime": "2021-05-20T13:45:05Z"
    }
},
{
    "kind": "youtube#searchResult",
    "etag": "LlOTuC_Py4Ty15ctKroSBVElx_A",
    "id": {
        "kind": "youtube#video",
        "videoId": "vbPWzISGE4k"
    },
    "snippet": {
        "publishedAt": "2020-10-19T02:00:11Z",
        "channelId": "UC6y6ag13bVPEGqRmDRx8IiQ",
        "title": "NCT U (엔시티 유) - Make A Wish (Birthday Song) 교차편집 stage mix",
        "description": "NCTU #MAKEAWISH #교차편집 NCT U Make A Wish 1주차 교차편집입니다  ‍♂  ‍♂ 손을 맞대 멬어위시  ✨ *제 영상 재업로드 하지 마세요 *Don't re-upload my ...",
        "thumbnails": {
            "default": {
                "url": "https://i.ytimg.com/vi/vbPWzISGE4k/default.jpg",
                "width": 120,
                "height": 90
            },
            "medium": {
                "url": "https://i.ytimg.com/vi/vbPWzISGE4k/mqdefault.jpg",
                "width": 320,
                "height": 180
            },
            "high": {
                "url": "https://i.ytimg.com/vi/vbPWzISGE4k/hqdefault.jpg",
                "width": 480,
                "height": 360
            }
        },
        "channelTitle": "치코피카CHIKOPIKA",
        "liveBroadcastContent": "none",
        "publishTime": "2020-10-19T02:00:11Z"
    }
}
]*/
