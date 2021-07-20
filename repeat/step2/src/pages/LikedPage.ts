import {useState} from "~@core";
import {lectureVideoService} from "~services";
import {Movies, NotFoundMovies} from "~components";
import {LectureVideo} from "~@domain";

export const LikedPage = () => {
  const [lectureVideos, setLectureVideos] = useState(lectureVideoService.fetchLectureVideos());
  const videos = lectureVideos.filter(v => v.isLike);

  const updateLectureVideo = (video: LectureVideo) => {
    lectureVideoService.updateLectureVideo(video);
    setLectureVideos(lectureVideoService.fetchLectureVideos());
  }

  if (videos.length === 0) {
    return NotFoundMovies({
      text: "좋아요 한 영상이 없습니다."
    });
  }

  return Movies({ videos, updateLectureVideo });
}
