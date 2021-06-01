import {Repository} from "~_core";
import {YoutubeClipItem} from "~domain";

export interface LectureVideo {
  id: number;
  item: YoutubeClipItem;
  isLike: boolean;
  viewed: boolean;
}

export class LectureVideoRepository extends Repository<LectureVideo[]>{
  constructor() {
    super('LectureVideo');
  }
}

export const lectureVideoRepository = new LectureVideoRepository();
