import {Repository} from "~@core";
import {LectureVideo} from "~@domain";
import {Injectable} from "~@core/container";

@Injectable
export class LectureVideoRepository extends Repository<LectureVideo[]> {
  constructor() {
    super('LectureVideo');
  }
}
