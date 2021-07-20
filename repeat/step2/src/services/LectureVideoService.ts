import {LectureVideoRepository} from "~repositories";
import {YoutubeClipItem, LectureVideo} from "~@domain";
import {Inject, Injectable} from "~@core/container";

@Injectable
export class LectureVideoService {
  constructor(
    @Inject(LectureVideoRepository)
    private readonly lectureVideoRepository: LectureVideoRepository
  ) {}

  public fetchLectureVideos(): LectureVideo[] {
    return this.lectureVideoRepository.get() || [];
  }

  public addLectureVideos(youtubeClipItem: YoutubeClipItem) {
    const videos = this.fetchLectureVideos();
    if (videos.length >= 100) {
      return alert('최대 100개의 강의를 저장할 수 있습니다.');
    }
    this.lectureVideoRepository.set([
      ...videos,
      {
        id: Date.now(),
        item: youtubeClipItem,
        isLike: false,
        viewed: false,
      }
    ]);
  }

  public updateLectureVideo(lectureVideo: LectureVideo) {
    const videos = this.fetchLectureVideos();
    const index = videos.findIndex(v => v.id === lectureVideo.id);
    videos[index] = lectureVideo;
    this.lectureVideoRepository.set(videos);
  }
}
