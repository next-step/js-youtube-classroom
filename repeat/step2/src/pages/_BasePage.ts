import {LectureVideo} from "~@domain";
import {useState} from "~@core";
import {lectureVideoService} from "~services";
import {Movies, NotFoundMovies} from "~components";

interface MoviesContainerProps {
  filtering: (v: LectureVideo) => boolean;
  notFoundText: string;
}

export const _BasePage = ({ notFoundText, filtering }: MoviesContainerProps) => {
  const [lectureVideos, setLectureVideos] = useState(lectureVideoService.fetchLectureVideos());
  const videos = lectureVideos.filter(filtering);

  const reloadLectureVideos = () => setLectureVideos(lectureVideoService.fetchLectureVideos());

  const updateLectureVideo = (video: LectureVideo) => {
    lectureVideoService.updateLectureVideo(video);
    reloadLectureVideos();
  }

  const removeLectureVideo = (id: number) => {
    lectureVideoService.removeLectureVideo(id);
    reloadLectureVideos();
  }

  if (videos.length === 0) {
    return NotFoundMovies({
      text: notFoundText
    });
  }

  return Movies({ videos, updateLectureVideo, removeLectureVideo });
}
