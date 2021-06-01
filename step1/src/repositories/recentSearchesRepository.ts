import {Repository} from "~_core/Repository";
import {YoutubeClipItem} from "~domain";

export class RecentSearchRepository extends Repository<string[]> {
  constructor() {
    super('RecentSearches');
  }
}

export const recentSearchesRepository = new RecentSearchRepository();
