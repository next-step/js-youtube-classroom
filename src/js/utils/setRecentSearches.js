import $ from 'js/dom/dom';

const setRecentSearches = recentSearches => {
  $.recentSearchList.innerHTML = `<span class="text-gray-700">최근 검색어: </span>
${recentSearches
  .map(
    searchKeyword => `
<a class="chip">${searchKeyword}</a>`
  )
  .join('')}`;
};

export default setRecentSearches;
