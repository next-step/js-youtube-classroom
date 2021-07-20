import {useState} from "~@core";

import {lectureVideoService} from "~services";
import {Movies, NotFoundMovies} from "~components";
import {LectureVideo} from "~@domain";

export const ViewedPage = () => {
  const [lectureVideos, setLectureVideos] = useState(lectureVideoService.fetchLectureVideos());
  const videos = lectureVideos.filter(v => v.viewed);

  const updateLectureVideo = (video: LectureVideo) => {
    lectureVideoService.updateLectureVideo(video);
    setLectureVideos(lectureVideoService.fetchLectureVideos());
  }

  if (videos.length === 0) {
    return NotFoundMovies({
      text: "본 영상이 없습니다."
    });
  }

  return Movies({ videos, updateLectureVideo });
}
