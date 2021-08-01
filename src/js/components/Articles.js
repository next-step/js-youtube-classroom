import {findAllByVideoIds} from '../apis/youtubeApis.js';
import videoStore from '../store/videoStore.js';
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

    const bindEvents = () => {
        $el.addEventListener('click', ({target: {dataset: {click, videoId}}}) => {
            if (!click) {
                return;
            }

            if (click === 'toggleWatched') {
                videoStore.toggleWatchedVideo({videoId});
                return;
            }

            if (click === 'toggleLiked') {
                videoStore.toggleLikedVideo({videoId});
                return;
            }

            if (click === 'deleteVideo') {
                if (confirm('해당 영상을 삭제하시겠습니까?')) {
                    videoStore.deleteSavedVideo({videoId});
                }
                return;
            }
        });
    };

    const articleNormalTemplate = ({videoId, title, channelId, channelTitle, publishedAt, isWatched, isLiked}) => `
        <article class="clip" data-video-id>
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
                        <span class="${isWatched || 'opacity-hover'}" data-click="toggleWatched" data-video-id="${videoId}">✅</span>
                        <span class="${isLiked || 'opacity-hover'}" data-click="toggleLiked" data-video-id="${videoId}">👍</span>
                        <span class="opacity-hover" data-click="deleteVideo" data-video-id="${videoId}">🗑️</span>
                    </div>
                </div>
            </div>
        </article>
    `;

    const articlesEmptyTemplate = `
        <span id="empty-video-list" class="stretch text-center" data-test="empty-video-message">영상이 없습니다. 😥</span>
    `;

    const loadArticles = async () => {
        const savedVideos = videoStore.getSavedVideos();
        const {items: articles} = await findAllByVideoIds({videoIds: savedVideos.map(({videoId}) => videoId)});
        setState({
            articles: articles.map(article => {
                const videoId = article.videoId;
                const {isWatched, isLiked} = savedVideos.find(video => video.videoId === videoId);

                return {
                    ...article,
                    isWatched,
                    isLiked,
                };
            }),
        });
    };

    const render = () => {
        const {articles} = state;
        const {routePath} = props;
        const articlesTemplate = articles.filter(({isWatched, isLiked}) => {
                                             if (routePath === router.PATH.TO_WATCH) {
                                                 return !isWatched;
                                             }
                                             if (routePath === router.PATH.WATCHED) {
                                                 return isWatched;
                                             }
                                             if (routePath === router.PATH.LIKED) {
                                                 return isLiked;
                                             }
                                         })
                                         .map(({
                                                   videoId,
                                                   channelId,
                                                   channelTitle,
                                                   title,
                                                   publishedAt,
                                                   isWatched,
                                                   isLiked,
                                               }) => articleNormalTemplate({
                                             videoId,
                                             title,
                                             channelId,
                                             channelTitle,
                                             publishedAt,
                                             isWatched,
                                             isLiked,
                                         }))
                                         .join('');

        $el.innerHTML = `
            <main class="mt-10">
                <section class="video-wrapper">
                    ${articlesTemplate || articlesEmptyTemplate}     
                </section>
            </main>
        `;
    };

    videoStore.subscribeStore(() => loadArticles());
    bindEvents();
    loadArticles();
}
