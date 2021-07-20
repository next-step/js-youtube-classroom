import {Repository, Injectable} from "~@core";
import {LectureVideo} from "~@domain";

@Injectable
export class LectureVideoRepository extends Repository<LectureVideo[]> {
  constructor() {
    super('LectureVideo');
  }
}
