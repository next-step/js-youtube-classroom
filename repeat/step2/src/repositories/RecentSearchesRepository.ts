import {Repository} from "~@core";
import {Injectable} from "~@core/container";

@Injectable
export class RecentSearchRepository extends Repository<string[]> {
  constructor() {
    super('RecentSearches');
  }
}
