import {Repository} from "~_core/Repository";
import {YoutubeClipItem} from "~domain";

export type RecentSearchesItems = Record<string, YoutubeClipItem[]>;

export const recentSearchesRepository = new Repository<RecentSearchesItems>('RecentSearches');
