class VideoList {
  constructor($target, state) {
    this.state = state;
    this.$videoList = document.createElement('section');
  }

  render = () => {
    this.$videoList.innerHTML = `

        <div class="d-flex justify-end text-gray-700">
        저장된 영상 개수:&nbsp;<span id="saved-video-count">3 / 100</span>
        </div>
        <section id="video-search-result" class="video-wrapper"><article class="clip js-video relative" data-video-id="ifjs0UX56ZA" data-title="%EB%AC%B8%EC%9B%94%206%EC%8B%9C%EA%B0%84%20%EB%A0%88%EC%A0%84%EB%93%9C%20%EC%A0%9C%EB%A1%9C%ED%88%AC%20%23shorts" data-channel-id="UCtp1okjd3xQAhPNY8Wgt_Fg" data-channel-title="%EB%AC%B8%EC%9B%94%20%EC%9C%A0%ED%8A%9C%EB%B8%8C" data-publish-time="2021-06-02T14:08:24Z">
        <div class="preview-container">
        <iframe class="js-preview" width="100%" height="118" src="https://www.youtube.com/embed/ifjs0UX56ZA" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe>
        </div>
        <div class="content-container pt-2 px-1">
        <h3>문월 6시간 레전드 제로투 #shorts</h3>
        <div>
            <a href="https://www.youtube.com/channel/UCtp1okjd3xQAhPNY8Wgt_Fg" target="_blank" class="channel-name mt-1">
            문월 유튜브
            </a>
            <div class="meta">
            <p>2021년 5월 2일</p>
            </div>
        </div>
        </div>
        <div class="button-list d-flex justify-end">
        <button class="btn js-save-cancel-button" }="">↪️ 저장 취소</button>
        </div>
    </article><article class="clip js-video relative" data-video-id="wUk3xcv6YpI" data-title="%EB%A6%B4%EC%B9%B4...%EC%A0%9C%EB%A1%9C%ED%88%AC" data-channel-id="UC48NSSfUBsmL0k0wKxSqRkw" data-channel-title="%EB%A6%B4%EC%B9%B4" data-publish-time="2021-06-07T11:46:22Z">
        <div class="preview-container">
        <iframe class="js-preview" width="100%" height="118" src="https://www.youtube.com/embed/wUk3xcv6YpI" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe>
        </div>
        <div class="content-container pt-2 px-1">
        <h3>릴카...제로투</h3>
        <div>
            <a href="https://www.youtube.com/channel/UC48NSSfUBsmL0k0wKxSqRkw" target="_blank" class="channel-name mt-1">
            릴카
            </a>
            <div class="meta">
            <p>2021년 5월 7일</p>
            </div>
        </div>
        </div>
        <div class="button-list d-flex justify-end">
        <button class="btn js-save-cancel-button" }="">↪️ 저장 취소</button>
        </div>
    </article><article class="clip js-video relative" data-video-id="wGDwnHZutJM" data-title="100kg%20%EC%A0%9C%EB%A1%9C%ED%88%AC" data-channel-id="UCdtRAcd3L_UpV4tMXCw63NQ" data-channel-title="%ED%94%BC%EC%A7%80%EC%BB%AC%EA%B0%A4%EB%9F%AC%EB%A6%AC" data-publish-time="2021-06-15T11:12:26Z">
        <div class="preview-container">
        <iframe class="js-preview" width="100%" height="118" src="https://www.youtube.com/embed/wGDwnHZutJM" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe>
        </div>
        <div class="content-container pt-2 px-1">
        <h3>100kg 제로투</h3>
        <div>
            <a href="https://www.youtube.com/channel/UCdtRAcd3L_UpV4tMXCw63NQ" target="_blank" class="channel-name mt-1">
            피지컬갤러리
            </a>
            <div class="meta">
            <p>2021년 5월 15일</p>
            </div>
        </div>
        </div>
        <div class="button-list d-flex justify-end">
        <button class="btn js-save-cancel-button" }="">↪️ 저장 취소</button>
        </div>
    </article><article class="clip js-video relative" data-video-id="AGSqJgKxS7A" data-title="%EA%B0%90%EC%8A%A4%ED%8A%B8%20%EC%A0%9C%EB%A1%9C%ED%88%AC%20%EC%B6%A4%20%EB%A0%88%EC%A0%84%EB%93%9C%20zero%20two%20dance" data-channel-id="UCbFzvzDu17eDZ3RIeaLRswQ" data-channel-title="%EA%B0%90%EC%8A%A4%ED%8A%B8GAMST" data-publish-time="2021-06-03T09:54:12Z">
        <div class="preview-container">
        <iframe class="js-preview" width="100%" height="118" src="https://www.youtube.com/embed/AGSqJgKxS7A" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe>
        </div>
        <div class="content-container pt-2 px-1">
        <h3>감스트 제로투 춤 레전드 zero two dance</h3>
        <div>
            <a href="https://www.youtube.com/channel/UCbFzvzDu17eDZ3RIeaLRswQ" target="_blank" class="channel-name mt-1">
            감스트GAMST
            </a>
            <div class="meta">
            <p>2021년 5월 3일</p>
            </div>
        </div>
        </div>
        <div class="button-list d-flex justify-end">
        <button class="btn js-save-button" }="">⬇️ 저장</button>
        </div>
    </article><article class="clip js-video relative" data-video-id="y1mKWhgZGi8" data-title="%F0%9F%92%8B%EC%A0%9C%EB%A1%9C%ED%88%AC%20%EB%8C%84%EC%8A%A4%EB%A5%BC%203%EC%8B%9C%EA%B0%84%EC%B6%94%EB%A9%B4...%EA%B0%88%EC%88%98%EB%A1%9D...%F0%9F%92%8B" data-channel-id="UCnWlpvpBS4uxEnpHwJ2SVeg" data-channel-title="%EC%B1%84%EA%B3%B5%EC%A3%BC%E2%80%A2%EC%B1%84%EC%9B%90" data-publish-time="2021-06-04T15:34:22Z">
        <div class="preview-container">
        <iframe class="js-preview" width="100%" height="118" src="https://www.youtube.com/embed/y1mKWhgZGi8" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe>
        </div>
        <div class="content-container pt-2 px-1">
        <h3>💋제로투 댄스를 3시간추면...갈수록...💋</h3>
        <div>
            <a href="https://www.youtube.com/channel/UCnWlpvpBS4uxEnpHwJ2SVeg" target="_blank" class="channel-name mt-1">
            채공주•채원
            </a>
            <div class="meta">
            <p>2021년 5월 5일</p>
            </div>
        </div>
        </div>
        <div class="button-list d-flex justify-end">
        <button class="btn js-save-button" }="">⬇️ 저장</button>
        </div>
    </article><article class="clip js-video relative" data-video-id="afRNWF2FCO0" data-title="%EC%A0%84%EC%84%B8%EA%B3%84%2033000%EB%AA%85%EC%9D%B4%20%EC%8B%9C%EC%B2%AD%ED%95%9C%20%EC%A0%9C%EB%A1%9C%ED%88%AC" data-channel-id="UCmMxEFwIOMGGoThkmtZZOvQ" data-channel-title="%EC%96%91%EC%95%84%EC%A7%80" data-publish-time="2021-06-17T08:00:00Z">
        <div class="preview-container">
        <iframe class="js-preview" width="100%" height="118" src="https://www.youtube.com/embed/afRNWF2FCO0" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe>
        </div>
        <div class="content-container pt-2 px-1">
        <h3>전세계 33000명이 시청한 제로투</h3>
        <div>
            <a href="https://www.youtube.com/channel/UCmMxEFwIOMGGoThkmtZZOvQ" target="_blank" class="channel-name mt-1">
            양아지
            </a>
            <div class="meta">
            <p>2021년 5월 17일</p>
            </div>
        </div>
        </div>
        <div class="button-list d-flex justify-end">
        <button class="btn js-save-button" }="">⬇️ 저장</button>
        </div>
    </article><article class="clip js-video relative" data-video-id="lIqL6YMFDXM" data-title="%EC%99%84%EB%B2%BD%ED%95%9C%20%EC%A0%9C%EB%A1%9C%ED%88%AC" data-channel-id="UCUrT-jsFk8MwrEGWdqDRMxQ" data-channel-title="%EC%83%88%EB%81%BC1" data-publish-time="2021-04-30T16:57:59Z">
        <div class="preview-container">
        <iframe class="js-preview" width="100%" height="118" src="https://www.youtube.com/embed/lIqL6YMFDXM" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe>
        </div>
        <div class="content-container pt-2 px-1">
        <h3>완벽한 제로투</h3>
        <div>
            <a href="https://www.youtube.com/channel/UCUrT-jsFk8MwrEGWdqDRMxQ" target="_blank" class="channel-name mt-1">
            새끼1
            </a>
            <div class="meta">
            <p>2021년 4월 1일</p>
            </div>
        </div>
        </div>
        <div class="button-list d-flex justify-end">
        <button class="btn js-save-button" }="">⬇️ 저장</button>
        </div>
    </article><article class="clip js-video relative" data-video-id="lyyE6QRac5Y" data-title="%EC%A0%9C%EB%A1%9C%ED%88%AC%20%EB%8C%84%EC%8A%A4%EA%B0%80%20%EC%8B%9C%EC%9E%91%EB%90%9C%20%EB%B0%94%EB%A1%9C%20%EA%B7%B8%20%EC%9E%A5%EB%A9%B4" data-channel-id="UC-86TJWZeW_Omlp9GH3-SSw" data-channel-title="%EC%A7%84%EC%A7%80%ED%95%9C%20%EC%9A%B0%EB%9D%BC" data-publish-time="2021-06-27T23:55:04Z">
        <div class="preview-container">
        <iframe class="js-preview" width="100%" height="118" src="https://www.youtube.com/embed/lyyE6QRac5Y" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe>
        </div>
        <div class="content-container pt-2 px-1">
        <h3>제로투 댄스가 시작된 바로 그 장면</h3>
        <div>
            <a href="https://www.youtube.com/channel/UC-86TJWZeW_Omlp9GH3-SSw" target="_blank" class="channel-name mt-1">
            진지한 우라
            </a>
            <div class="meta">
            <p>2021년 5월 28일</p>
            </div>
        </div>
        </div>
        <div class="button-list d-flex justify-end">
        <button class="btn js-save-button" }="">⬇️ 저장</button>
        </div>
    </article><article class="clip js-video relative" data-video-id="Ql3o-rjsY9Y" data-title="%EC%A0%90%EC%A0%90%20%EB%A7%A4%EC%9B%8C%EC%A7%80%EB%8A%94%20%EA%B3%BC%EC%A6%99%EC%84%B8%EC%97%B0%EC%9D%98%20%EC%A0%9C%EB%A1%9C%ED%88%AC....%F0%9F%8C%B6" data-channel-id="UCny89ZH994jZZ3JABYQgDVQ" data-channel-title="%EA%B3%BC%EC%A6%99%EC%84%B8%EC%97%B0" data-publish-time="2021-06-01T14:30:14Z">
        <div class="preview-container">
        <iframe class="js-preview" width="100%" height="118" src="https://www.youtube.com/embed/Ql3o-rjsY9Y" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe>
        </div>
        <div class="content-container pt-2 px-1">
        <h3>점점 매워지는 과즙세연의 제로투....🌶</h3>
        <div>
            <a href="https://www.youtube.com/channel/UCny89ZH994jZZ3JABYQgDVQ" target="_blank" class="channel-name mt-1">
            과즙세연
            </a>
            <div class="meta">
            <p>2021년 5월 1일</p>
            </div>
        </div>
        </div>
        <div class="button-list d-flex justify-end">
        <button class="btn js-save-button" }="">⬇️ 저장</button>
        </div>
    </article><article class="clip js-video relative" data-video-id="TLqB0tTTkRE" data-title="%ED%98%B9%EC%8B%9C%20%EB%AC%B8%EC%9B%94%EC%9D%B4%20%EC%A0%9C%EB%A1%9C%ED%88%AC%20%EB%B4%A4%EC%96%B4%EC%9A%94..%3F" data-channel-id="UCtp1okjd3xQAhPNY8Wgt_Fg" data-channel-title="%EB%AC%B8%EC%9B%94%20%EC%9C%A0%ED%8A%9C%EB%B8%8C" data-publish-time="2021-06-07T15:32:14Z">
        <div class="preview-container">
        <iframe class="js-preview" width="100%" height="118" src="https://www.youtube.com/embed/TLqB0tTTkRE" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe>
        </div>
        <div class="content-container pt-2 px-1">
        <h3>혹시 문월이 제로투 봤어요..?</h3>
        <div>
            <a href="https://www.youtube.com/channel/UCtp1okjd3xQAhPNY8Wgt_Fg" target="_blank" class="channel-name mt-1">
            문월 유튜브
            </a>
            <div class="meta">
            <p>2021년 5월 8일</p>
            </div>
        </div>
        </div>
        <div class="button-list d-flex justify-end">
        <button class="btn js-save-button" }="">⬇️ 저장</button>
        </div>
    </article></section>

    `;
  };

  setState = nextState => {
    this.state = nextState;
    this.render();
  };
}

export default VideoList;
