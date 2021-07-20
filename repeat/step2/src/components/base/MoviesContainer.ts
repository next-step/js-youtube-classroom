import {LectureVideo} from "~@domain";
import {useState} from "~@core";
import {lectureVideoService} from "~services";
import {Movies, NotFoundMovies} from "~components";

interface MoviesContainerProps {
  filtering: (v: LectureVideo) => boolean;
  notFoundText: string;
}

export const MoviesContainer = ({ notFoundText, filtering }: MoviesContainerProps) => {
  const [lectureVideos, setLectureVideos] = useState(lectureVideoService.fetchLectureVideos());
  const videos = lectureVideos.filter(filtering);

  const updateLectureVideo = (video: LectureVideo) => {
    lectureVideoService.updateLectureVideo(video);
    setLectureVideos(lectureVideoService.fetchLectureVideos());
  }

  if (videos.length === 0) {
    return NotFoundMovies({
      text: notFoundText
    });
  }

  return Movies({ videos, updateLectureVideo });
}
