import {useState} from "~@core";
import {lectureVideoService} from "~services";
import {Movies, NotFoundMovies} from "~components";

export const LikedPage = () => {
  const [lectureVideos] = useState(lectureVideoService.fetchLectureVideos());
  const videos = lectureVideos.filter(v => v.isLike);

  if (videos.length === 0) {
    return NotFoundMovies({
      text: "좋아요 한 영상이 없습니다."
    });
  }

  return Movies({ videos });
}
