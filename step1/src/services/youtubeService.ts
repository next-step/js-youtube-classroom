import { YOUTUBE_API_KEY } from "~services/secret";
import { YoutubeClient, YoutubeClipItem } from "~domain";
import {RecentSearchesItems, recentSearchesRepository} from "~repositories";

class YoutubeService {
  private activation: boolean = false;
  private client?: YoutubeClient

  constructor() {}

  private get cache(): RecentSearchesItems {
    return recentSearchesRepository.get() || {};
  }

  private addCache(key: string, values: YoutubeClipItem[]): void {
    recentSearchesRepository.set({
      ...this.cache,
      [key]: values
    });
  }

  private init(): Promise<void> {
    return new Promise(resolve => {
      gapi.load('client', () => {
        gapi.client.setApiKey(YOUTUBE_API_KEY);
        gapi.client.load('youtube', 'v3', () => {
          this.client = gapi.client as unknown as YoutubeClient
          resolve();
        });
      })
    })
  }

  private async request(q: string): Promise<any> {
    return this.client!.youtube.search.list({
      q: q,
      part: 'snippet',
      order: 'viewCount',
      maxResults: 5,
    });
  }

  public async search(q: string): Promise<YoutubeClipItem[]> {
    if (this.cache[q]) {
      return this.cache[q];
    }
    if (!this.activation) {
      await this.init();
    }
    const { result } = await this.request(q);
    const items = result.items as unknown as YoutubeClipItem[];
    this.addCache(q, items);
    return items;
  }

  public getRecentSearchKeys(): string[] {
    return Object.keys(this.cache);
  }
}

export const youtubeService = new YoutubeService();

