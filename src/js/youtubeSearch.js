import $ from 'js/dom/dom';
import ajax from 'js/api/ajax';
import skeleton from 'js/components/skeleton';
import notFound from 'js/components/notFound';
import searchListAppend from 'js/utils/searchListAppend';
import debounce from 'js/utils/debounce';
import setRecentSearches from 'js/utils/setRecentSearches';

const recentSearchArticles = JSON.parse(localStorage.getItem('recentSearchArticles'));
const recentSearches = JSON.parse(localStorage.getItem('recentSearches')) ?? [];

let youtubeData = {
  loading: false,
  q: recentSearchArticles?.q ?? '',
  error: null,
  data: { nextPageToken: recentSearchArticles?.nextPageToken ?? '', items: recentSearchArticles?.data ?? [] },
  recentSearches,
  recentSearchArticles: { q: '', nextPageToken: '', data: recentSearchArticles?.data ?? [] },
};

setRecentSearches(youtubeData.recentSearches);
searchListAppend(youtubeData.recentSearchArticles.data);

const onSearchYoutubeHandler = async e => {
  e.preventDefault();

  youtubeData = { ...youtubeData, q: $.youtubeSearchInput.value };

  if (youtubeData.q === '') {
    youtubeData = { ...youtubeData, data: [] };
    $.modalVideoWrapper.innerHTML = notFound();
    return;
  }

  youtubeData = { ...youtubeData, loading: true };

  if (youtubeData.loading) {
    $.modalVideoWrapper.innerHTML = skeleton();
  }

  try {
    const res = await ajax.searchYoutubeByTitle(youtubeData.q);
    const data = await res.json();

    const newRecentSearches = [youtubeData.q, ...youtubeData.recentSearches.filter((_, i) => i < 2)];

    setRecentSearches(newRecentSearches);

    youtubeData = {
      ...youtubeData,
      data,
      loading: false,
    };

    if (!youtubeData.data.items.length) {
      $.modalVideoWrapper.innerHTML = notFound();
      return;
    }

    $.modalVideoWrapper.innerHTML = '';

    searchListAppend(youtubeData.data.items);

    localStorage.setItem('recentSearches', JSON.stringify(newRecentSearches));
    localStorage.setItem(
      'recentSearchArticles',
      JSON.stringify({
        q: youtubeData.q,
        nextPageToken: youtubeData.data.nextPageToken,
        data: youtubeData.data.items,
      })
    );
  } catch (error) {
    youtubeData = { ...youtubeData, error };
    throw new Error(error);
  }
};

const fetchMore = async ({ srcElement: { scrollHeight, scrollTop, clientHeight } }) => {
  if (scrollHeight === scrollTop + clientHeight) {
    try {
      const res = await ajax.nextPage(youtubeData.q, youtubeData.data.nextPageToken);
      const nextPageData = await res.json();

      youtubeData = {
        ...youtubeData,
        data: { ...nextPageData, items: [...youtubeData.data.items, ...nextPageData.items] },
      };

      searchListAppend(youtubeData.data.items);

      localStorage.setItem(
        'recentSearchArticles',
        JSON.stringify({
          q: youtubeData.q,
          nextPageToken: youtubeData.data.nextPageToken,
          data: youtubeData.data.items,
        })
      );
    } catch (error) {
      youtubeData = { ...youtubeData, error };
      throw new Error(error);
    }
  }
};

$.youtubeSearchForm.addEventListener('submit', onSearchYoutubeHandler);
$.modalInner.addEventListener('scroll', debounce(fetchMore, 200));
