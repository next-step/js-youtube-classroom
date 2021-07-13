import {Repository} from "~@core";
import {LectureVideo} from "~@domain";

export class LectureVideoRepository extends Repository<LectureVideo[]> {
  constructor() {
    super('LectureVideo');
  }
}

export const lectureVideoRepository = new LectureVideoRepository();
