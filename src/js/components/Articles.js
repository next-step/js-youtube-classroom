import {findAllByVideoIds} from '../apis/youtubeApis.js';
import {getSavedVideos} from '../store/videoStore.js';

export function Articles($el) {

    const state = {
        articles: [],
    };

    const setState = ({articles}) => {
        state.articles = articles ?? state.articles;
        render();
    };

    const articleNormalTemplate = ({videoId, title, channelId, channelTitle, publishedAt}) => `
        <article class="clip">
            <div class="preview-container">
                <iframe
                    width="100%"
                    height="118"
                    src="https://www.youtube.com/embed/${videoId}"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
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
                        <p>${publishedAt}</p>
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

    const loadArticles = async () => {
        const videoIds = getSavedVideos();
        const {items: articles} = await findAllByVideoIds({videoIds});
        setState({articles});
    };

    const render = () => {
        const {articles} = state;
        const articlesTemplate = articles.map(({
                                                   videoId,
                                                   channelId,
                                                   channelTitle,
                                                   title,
                                                   publishedAt,
                                               }) => articleNormalTemplate({videoId, title, channelId, channelTitle, publishedAt}))
                                         .join('');

        $el.innerHTML = `
            <main class="mt-10">
                <section class="video-wrapper">
                    ${articlesTemplate}     
                </section>
            </main>
        `;
    };

    render();
    loadArticles();
}
