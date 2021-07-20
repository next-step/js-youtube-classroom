import {$} from '../utils/DOM.js';
import {formatDate} from '../utils/date.js';
import {videoInfos} from '../states/videoInfo.js';
import {saveButtonTemplate, saveCancelButtonTemplate} from './saveButton.js';

export const createSearchedVideoList = (videos) => {
    videos.map((video) => {
        $('#video-search-result').insertAdjacentHTML('beforeend', searchedVideoListTemplate(video));
    });
};

export const searchedVideoListTemplate = ({id, snippet}) => {
    const date = formatDate(snippet.publishTime);
    const buttonTemplate = saveButtonConroller(id.videoId);

    return `<article class="clip js-video relative" data-video-id="${id.videoId}" data-title="${snippet.title}" data-channel-id="${snippet.channelId}" data-channel-title="${snippet.channelTitle}" data-publish-time="${snippet.publishTime}">
                <div class="preview-container">
                   <iframe class="js-preview" width="100%" height="118" src="https://www.youtube.com/embed/${id.videoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe>
                </div>
                <div class="content-container pt-2 px-1">
                    <h3>${snippet.title}</h3>
                    <div>
                        <a href="https://www.youtube.com/channel/${snippet.channelId}" target="_blank" class="channel-name mt-1">
                        ${snippet.channelTitle}
                        </a>
                        <div class="meta">
                           <p>${date}</p>
                        </div>
                    </div>
                </div>
                <div class="button-list d-flex justify-end">
                    ${buttonTemplate}
                </div>
            </article>`;
};

const saveButtonConroller = (targetId) => {
    const savedVideoList = videoInfos.get();
    let buttonTemplate = '';

    savedVideoList.map((videoInfo) => {
        if (videoInfo.id.videoId === targetId) {
            buttonTemplate = saveCancelButtonTemplate();
            return;
        }
    });

    if (buttonTemplate === '') buttonTemplate = saveButtonTemplate();

    return buttonTemplate;
};
