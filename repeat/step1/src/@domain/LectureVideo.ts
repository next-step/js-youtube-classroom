import {YoutubeClipItem} from "~@domain/Youtube";

export interface LectureVideo {
  id: number;
  item: YoutubeClipItem;
  isLike: boolean;
  viewed: boolean;
}
