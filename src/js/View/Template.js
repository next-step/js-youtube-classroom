export const watchTemplate = (data, watched="opacity-hover",liked="opacity-hover") => {
  return`
    <article class="clip js-video relative">
        <div class="preview-container">
              <iframe class="js-preview" width="100%" height="118" src="https://www.youtube.com/embed/${data.videoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe>
            </div>
            <div class="content-container pt-2 px-1">
              <h3>${data.videoTitle} M/V</h3>
              <div>pooo
                <a href="https://www.youtube.com/channel/${data.channelId}" target="_blank" class="channel-name mt-1">
                ${data.channelTitle}
                </a>
                <div class="meta">
                  <p>${data.publishTime.slice(0,4)}년,${data.publishTime.slice(5,7)}월 ${data.publishTime.slice(8,10)}일 </p>
                </div>
              </div>
            </div>
            <div class="button-list d-flex justify-end">
              <span class="${watched} ml-2 js-watched-button" data-video-title="${data.videoTitle}">✅</span>
              <span class="${liked} ml-2 js-liked-button">👍🏻</span>
              <span class="opacity-hover ml-2 js-delete-button">🗑</span>
            </div>
          </article>
        `
}