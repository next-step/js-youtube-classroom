import {Repository} from "~@core";

export class RecentSearchRepository extends Repository<string[]> {
  constructor() {
    super('RecentSearches');
  }
}

export const recentSearchesRepository = new RecentSearchRepository();
