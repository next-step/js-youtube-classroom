import { renderingUtils, templateUtils } from 'utils';

const $lectureRoomVideoWrapper = document.querySelector('main .video-wrapper');
const savedYoutube = JSON.parse(localStorage.getItem('savedYoutubes'));
const hasSavedYoutube = !!savedYoutube?.length;

const renderLectureRoom = () =>
  hasSavedYoutube
    ? renderingUtils.renderYoutubeCards(
        $lectureRoomVideoWrapper,
        savedYoutube,
        templateUtils.getSavedYoutubeCardTemplate
      )
    : renderingUtils.renderNoResult(
        $lectureRoomVideoWrapper,
        templateUtils.getNoSavedYoutubeTemplate,
        '영상이 없습니다. 😥'
      );

document.addEventListener('DOMContentLoaded', renderLectureRoom);
