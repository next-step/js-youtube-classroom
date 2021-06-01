import {Repository} from "~_core";

export class RecentSearchRepository extends Repository<string[]> {
  constructor() {
    super('RecentSearches');
  }
}

export const recentSearchesRepository = new RecentSearchRepository();
