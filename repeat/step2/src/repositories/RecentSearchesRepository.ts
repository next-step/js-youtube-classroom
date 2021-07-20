import {Repository, Injectable} from "~@core";

@Injectable
export class RecentSearchRepository extends Repository<string[]> {
  constructor() {
    super('RecentSearches');
  }
}
