import {recentSearchesRepository, RecentSearchRepository} from "~repositories";

class RecentSearchesService {
  constructor(
    private readonly repository: RecentSearchRepository,
  ) {}

  public getSearches(): Set<string> {
    return new Set(this.repository.get() || []);
  }

  public addSearchKey(key: string): void {
    const searches = this.getSearches();
    searches.add(key);
    this.repository.set([ ...searches ].slice(-3));
  }
}

export const recentSearchesService = new RecentSearchesService(recentSearchesRepository);
