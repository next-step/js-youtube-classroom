export const SearchResultsTemplate = (results) => {
  const { items } = results;
  return items.map((item) => {
    const { id, snippet } = item;
    const { videoId } = id;
    const { title, channelId, channelTitle, publishTime } = snippet;

    return `
    <article class="clip">
                <div class="preview-container">
                  <iframe
                    width="100%"
                    height="118"
                    src="https://www.youtube.com/embed/${videoId}"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                  ></iframe>
                </div>
                <div class="content-container pt-2 px-1">
                  <h3>${title}</h3>
                  <div>
                    <a
                      href="https://www.youtube.com/channel/${channelId}"
                      target="_blank"
                      class="channel-name mt-1"
                    >
                      ${channelTitle}
                    </a>
                    <div class="meta">
                      <p>2021년 3월 2일</p>
                    </div>
                    <div>
                      <span class="opacity-hover">✅</span>
                      <span class="opacity-hover">👍</span>
                      <span class="opacity-hover">💬</span>
                      <span class="opacity-hover">🗑️</span>
                    </div>
                  </div>
                </div>
              </article>
    `;
  })

} 