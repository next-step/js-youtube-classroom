import {Inject, Injectable} from "~@core";

import {RecentSearchRepository} from "~repositories";

@Injectable
export class RecentSearchesService {
  constructor(
    @Inject(RecentSearchRepository)
    private readonly recentSearchRepository: RecentSearchRepository,
  ) {}

  public getSearches(): Set<string> {
    return new Set(this.recentSearchRepository.get() || []);
  }

  public addSearchKey(key: string): void {
    const searches = this.getSearches();
    searches.add(key);
    this.recentSearchRepository.set([ ...searches ].slice(-3));
  }
}

