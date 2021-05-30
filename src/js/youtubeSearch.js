import $ from 'js/dom/dom';
import ajax from 'js/api/ajax';
import skeleton from 'js/components/skeleton';
import searchArticle from 'js/components/searchArticle';
import notFound from 'js/components/notFound';

let youtubeData = {
  loading: false,
  error: null,
  data: [],
  nextPageToken: '',
};

const onSearchYoutubeHandler = async e => {
  e.preventDefault();

  const q = $.youtubeSearchInput.value;
  if (q === '') return;

  youtubeData = { ...youtubeData, loading: true };

  if (youtubeData.loading) {
    $.modalVideoWrapper.innerHTML = skeleton();
  }

  try {
    const res = await ajax.searchYoutubeByTitle(q);
    const data = await res.json();

    youtubeData = { ...youtubeData, data, loading: false };

    if (!youtubeData.data.items.length) {
      $.modalVideoWrapper.innerHTML = notFound();
      return;
    }

    $.modalVideoWrapper.innerHTML = youtubeData.data.items
      .map(({ id: { videoId }, snippet }) => searchArticle(videoId, snippet))
      .join('');
  } catch (error) {
    throw new Error(error);
  }
};

$.youtubeSearchForm.addEventListener('submit', onSearchYoutubeHandler);
