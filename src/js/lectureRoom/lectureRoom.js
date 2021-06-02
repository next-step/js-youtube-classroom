import {
  getSavedYoutubeCardTemplate,
  getNoSavedYoutubeTemplate
} from 'utils/templateUtils';
import { renderYoutubeCards, renderNoResult } from 'utils/renderingUtils';
import { initializeElementInner } from 'utils/initializingUtils';
import { filterId, filterDataById } from 'utils/filteringUtils';
import { state, lecturePageInfo } from 'utils/state';
import { setData } from 'utils/localStorageUtils';

const $lectureRoomVideoWrapper = document.querySelector('main .video-wrapper');
const $nav = document.querySelector('nav');

const renderLectureRoom = () => {
  const hasNotWatchedYoutube = !!lecturePageInfo.notWatched.videos?.length;

  hasNotWatchedYoutube
    ? renderYoutubeCards(
        $lectureRoomVideoWrapper,
        lecturePageInfo.notWatched.videos,
        getSavedYoutubeCardTemplate
      )
    : renderNoResult(
        $lectureRoomVideoWrapper,
        getNoSavedYoutubeTemplate,
        lecturePageInfo.notWatched.noResultMessage
      );
};

const checkRightTarget = (targetNode, classname) =>
  [...targetNode.classList].includes(classname);

const changeStateOfIsWatched = targetNode => {
  const targetId = targetNode.closest('article').id;
  const savedYoutubesTargetIndex = state.savedYoutubeIds.indexOf(targetId);
  const targetData = state.savedYoutubes[savedYoutubesTargetIndex];
  const targetIsWatched = targetData.isWatched;
  const updatedYoutubeData = {
    ...targetData,
    isWatched: !targetIsWatched
  };
  let targetIndex;

  const initializeTargetIndex = datas => {
    datas.forEach(({ id: { videoId } }, index) => {
      if (videoId !== targetId) return;
      targetIndex = index;
    });
  };
  const updateData = (willDelete, willAdd) => {
    willDelete.splice(targetIndex, 1);
    willAdd.push(updatedYoutubeData);
  };

  state.savedYoutubes.splice(savedYoutubesTargetIndex, 1, updatedYoutubeData);
  setData('savedYoutubes', state.savedYoutubes);

  if (targetIsWatched) {
    initializeTargetIndex(lecturePageInfo.watched.videos);
    updateData(
      lecturePageInfo.watched.videos,
      lecturePageInfo.notWatched.videos
    );

    targetNode.classList.remove('checked');
  } else {
    initializeTargetIndex(lecturePageInfo.notWatched.videos);
    updateData(
      lecturePageInfo.notWatched.videos,
      lecturePageInfo.watched.videos
    );

    targetNode.classList.add('checked');
  }
};

const removeSavedYoutube = targetNode => {
  const targetId = targetNode.closest('article').id;
  const updatedYoutubeIds = filterId(state.savedYoutubeIds, targetId);
  const updatedYoutubeData = filterDataById(state.savedYoutubes, targetId);

  state.savedYoutubeIds = updatedYoutubeIds;
  state.savedYoutubes = updatedYoutubeData;

  lecturePageInfo.notWatched.videos = filterDataById(
    lecturePageInfo.notWatched.videos,
    targetId
  );
  lecturePageInfo.watched.videos = filterDataById(
    lecturePageInfo.watched.videos,
    targetId
  );

  setData('savedYoutubeIds', updatedYoutubeIds);
  setData('savedYoutubes', updatedYoutubeData);
};

const clickSavedYoutubeButtons = (targetClassname, callback) => e => {
  const targetNode = e.target;
  if (!checkRightTarget(targetNode, targetClassname)) return;

  callback(targetNode);

  initializeElementInner($lectureRoomVideoWrapper);
  renderYoutubeCards(
    $lectureRoomVideoWrapper,
    lecturePageInfo[lecturePageInfo.currentPage].videos,
    getSavedYoutubeCardTemplate
  );
};

const onRemoveYoutube = clickSavedYoutubeButtons(
  'delete-btn',
  removeSavedYoutube
);

const onChangeStateOfIsWatched = clickSavedYoutubeButtons(
  'check-btn',
  changeStateOfIsWatched
);

const onClickNav = e => {
  const targetClassname = e.target.classList;
  if (![...targetClassname].includes('filterBtn')) return;

  const type = [...targetClassname]
    .find(classname => classname.match(/-btn$/))
    .split('-')[0];
  const lectureRoomPage = lecturePageInfo[type];

  lecturePageInfo.currentPage = type;

  [...$nav.querySelectorAll('.filterBtn')].forEach(button => {
    button.classList.remove('bg-cyan-100');
  });
  targetClassname.add('bg-cyan-100');

  if (lectureRoomPage.videos.length) {
    initializeElementInner($lectureRoomVideoWrapper);
    renderYoutubeCards(
      $lectureRoomVideoWrapper,
      lectureRoomPage.videos,
      getSavedYoutubeCardTemplate
    );
  } else {
    renderNoResult(
      $lectureRoomVideoWrapper,
      getNoSavedYoutubeTemplate,
      lectureRoomPage.noResultMessage
    );
  }
};

document.addEventListener('DOMContentLoaded', renderLectureRoom);
$lectureRoomVideoWrapper.addEventListener('click', onChangeStateOfIsWatched);
$lectureRoomVideoWrapper.addEventListener('click', onRemoveYoutube);
$nav.addEventListener('click', onClickNav);
