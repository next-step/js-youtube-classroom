import {formatDate} from '../utils/date.js';
import {hoverLikeButtonTemplate, hoverWatchButtonTemplate, likedButtonTemplate, watchedButtonTemplate} from './button.js';

export const createSavedVideoListTemplate = (videoInfos) => {
    return `${videoInfos
        .map((videoInfo) => savedVideoListTemplate(videoInfo))
        .reverse()
        .join('')}`;
};

export const savedVideoListTemplate = ({id, snippet, type}) => {
    const date = formatDate(snippet.publishTime);
    const isWatchedButton = watchedButton(type);
    const isLikedButton = likedButton(type);

    return `<article class="clip js-video relative" data-video-id="${id.videoId}" data-title="${snippet.title} data-channel-id="${snippet.channelId}" data-channel-title="${snippet.channelTitle}" data-publish-time="${snippet.publishTime}">
                <div class="preview-container">
                <iframe class="js-preview" width="100%" height="118" src="https://www.youtube.com/embed/${id.videoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe>
                </div>
                <div class="content-container pt-2 px-1">
                <h3>${snippet.title}</h3>
                <div>
                    <a href="https://www.youtube.com/channel/UCZECMCJJJE47ei170XCXgdA" target="_blank" class="channel-name mt-1">
                    FNCEnt
                    </a>
                    <div class="meta">
                    <p>${date}</p>
                    </div>
                </div>
                </div>
                <div class="button-list d-flex justify-end">
                    ${isWatchedButton}
                    ${isLikedButton}
                    <span id="delete" class="opacity-hover ml-2 js-delete-button">🗑</span>
                </div>
            </article>`;
};

const watchedButton = (type) => {
    if (type.isWatched) return watchedButtonTemplate();
    else return hoverWatchButtonTemplate();
};

const likedButton = (type) => {
    if (type.isLiked) return likedButtonTemplate();
    else return hoverLikeButtonTemplate();
};
