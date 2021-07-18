// template
export const modalContentTemp = (item, storedItems) => {
   let storedVideoId = storedItems.map(item => item.id);
   let isStored = storedVideoId.includes(item.id.videoId);
   let temp = `
<article className="clip">
    <iframe
                    width="100%"
                    height="118"
                    src="https://www.youtube.com/embed/${item.id.videoId || item.id.playlistId}"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                    loading="lazy"
                  ></iframe>
    <div class="content-container pt-2 px-1">
                  <h3>${item.snippet.title}</h3>
                  <div>
                    <a
                      href="https://www.youtube.com/channel/${item.snippet.channelId}"
                      target="_blank"
                      class="channel-name mt-1"
                    >
                      ${item.snippet.channelTitle}
                    </a>
                    <div class="meta">
                      <p>${item.snippet.publishedAt}</p>
                    </div>
                    <div class="d-flex justify-end">
                    
                    ${isStored ? `<button class="btn delete">⬇️ 저장 취소</button>` : `<button class="btn save">⬇️ 저장</button>`}
                      
                    </div>
                  </div>
    </div>
    </article>
`
    return temp;

}
export const mainContentTemp = (item) => {
    let isWatched = item.type.isWatched;
    let isLiked = item.type.isLiked;
    let temp = `
    <article class="clip">
                  <iframe
                    width="100%"
                    height="118"
                    src="https://www.youtube.com/embed/${item.id}"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                    loading="lazy"
                  ></iframe>
                </div>
                <div class="content-container pt-2 px-1">
                  <h3>${item.snippet.title}</h3>
                  <div>
                    <a
                      href="https://www.youtube.com/channel/UC-mOekGSesms0agFntnQang"
                      target="_blank"
                      class="channel-name mt-1"
                    >
                      ${item.snippet.channelTitle}
                    </a>
                    <div class="meta">
                      <p>${item.snippet.publishedAt}</p>
                    </div>
                    <div>
                      ${isWatched ? `<span class="watch">✅</span>` :`<span class="opacity-hover watch">✅</span>`}
                      ${isLiked ? `<span class="like">👍</span>` : `<span class="opacity-hover like">👍</span>` }
                      <span class="opacity-hover delete">🗑️</span>
                    </div>
                  </div>
                </article>
    `
    return temp;
}

