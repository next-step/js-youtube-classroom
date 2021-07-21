import {findAllByVideoIds} from '../apis/youtubeApis.js';
import {getSavedVideos, subscribeStore} from '../store/videoStore.js';
import router from '../router.js';

/**
 * @param $el
 * @param props
 * @param {string} props.routePath
 * @constructor
 */
export function Articles($el, props) {

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
        const videos = getSavedVideos();
        const {items: articles} = await findAllByVideoIds({videoIds: videos.map(({videoId}) => videoId)});
        setState({articles});
    };

    const render = () => {
        const {articles} = state;
        const {routePath} = props;
        const articlesTemplate = articles.filter(({isWatched, isLiked}) => {
                                             if (routePath === router.PATH.TO_WATCH) {
                                                 return !isWatched;
                                             }
                                             if (routePath === router.PATH.TO_WATCH) {
                                                 return isWatched;
                                             }
                                             if (routePath === router.PATH.TO_WATCH) {
                                                 return isLiked;
                                             }
                                         })
                                         .map(({
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

    subscribeStore(() => loadArticles());
    render();
    loadArticles();
}
