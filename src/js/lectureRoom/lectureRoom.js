import { renderingUtils, templateUtils, initializingUtils } from 'utils';
import { state, lectureRoomPageInfo } from 'searchModal/state';

const $lectureRoomVideoWrapper = document.querySelector('main .video-wrapper');
const $nav = document.querySelector('nav');

const renderLectureRoom = () => {
  const hasNotWatchedYoutube = !!lectureRoomPageInfo.notWatched.videos?.length;
  hasNotWatchedYoutube
    ? renderingUtils.renderYoutubeCards(
        $lectureRoomVideoWrapper,
        lectureRoomPageInfo.notWatched.videos,
        templateUtils.getSavedYoutubeCardTemplate
      )
    : renderingUtils.renderNoResult(
        $lectureRoomVideoWrapper,
        templateUtils.getNoSavedYoutubeTemplate,
        lectureRoomPageInfo.notWatched.noResultMessage
      );
};

const onClickYoutubeCardButtons = e => {
  const targetNode = e.target;

  if (![...targetNode.classList].includes('check-btn')) return;

  const targetId = targetNode.closest('article').id;
  const savedYoutubesTargetIndex = state.savedYoutubeIds.indexOf(targetId);
  const targetData = state.savedYoutubes[savedYoutubesTargetIndex];
  const targetIsWatched = targetData.isWatched;
  const updatedYoutubeData = {
    ...targetData,
    isWatched: !targetIsWatched
  };
  let targetIndex;

  state.savedYoutubes.splice(savedYoutubesTargetIndex, 1, updatedYoutubeData);
  localStorage.setItem('savedYoutubes', JSON.stringify(state.savedYoutubes));

  if (targetIsWatched) {
    lectureRoomPageInfo.watched.videos.forEach(({ id: { videoId } }, index) => {
      if (videoId !== targetId) return;
      targetIndex = index;
    });

    lectureRoomPageInfo.watched.videos.splice(targetIndex, 1);
    lectureRoomPageInfo.notWatched.videos.push(updatedYoutubeData);

    targetNode.classList.remove('checked');
  } else {
    lectureRoomPageInfo.notWatched.videos.forEach(
      ({ id: { videoId } }, index) => {
        if (videoId !== targetId) return;
        targetIndex = index;
      }
    );

    lectureRoomPageInfo.notWatched.videos.splice(targetIndex, 1);
    lectureRoomPageInfo.watched.videos.push(updatedYoutubeData);

    targetNode.classList.add('checked');
  }

  initializingUtils.initializeElementInner($lectureRoomVideoWrapper);
  renderingUtils.renderYoutubeCards(
    $lectureRoomVideoWrapper,
    lectureRoomPageInfo[state.currentLectureRoomPage].videos,
    templateUtils.getSavedYoutubeCardTemplate
  );
};

const onClickNav = e => {
  const targetClassname = e.target.classList;
  if (![...targetClassname].includes('filterBtn')) return;

  const type = [...targetClassname]
    .find(classname => classname.match(/-btn$/))
    .split('-')[0];
  const lectureRoomPage = lectureRoomPageInfo[type];

  state.currentLectureRoomPage = type;

  [...$nav.querySelectorAll('.filterBtn')].forEach(button => {
    button.classList.remove('bg-cyan-100');
  });
  targetClassname.add('bg-cyan-100');

  if (lectureRoomPage.videos.length) {
    initializingUtils.initializeElementInner($lectureRoomVideoWrapper);
    renderingUtils.renderYoutubeCards(
      $lectureRoomVideoWrapper,
      lectureRoomPage.videos,
      templateUtils.getSavedYoutubeCardTemplate
    );
  } else {
    renderingUtils.renderNoResult(
      $lectureRoomVideoWrapper,
      templateUtils.getNoSavedYoutubeTemplate,
      lectureRoomPage.noResultMessage
    );
  }
};

document.addEventListener('DOMContentLoaded', renderLectureRoom);
$lectureRoomVideoWrapper.addEventListener('click', onClickYoutubeCardButtons);
$nav.addEventListener('click', onClickNav);
