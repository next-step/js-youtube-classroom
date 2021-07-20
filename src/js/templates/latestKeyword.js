import {$} from '../utils/DOM.js';

export const createLatestKeyword = (keywordList) => {
    $('#latest-keyword-list').innerHTML = latestKeywordList();

    keywordList.map((keyword) => {
        $('#latest-keyword-list').insertAdjacentHTML('beforeend', latestKeywordTemplate(keyword));
    });
};

const latestKeywordTemplate = (keyword) => {
    return `<span class="js-latest-keyword chip">${keyword}</span>`;
};

const latestKeywordList = () => {
    return `<span class="text-gray-700">최근 검색어: </span>`;
};
