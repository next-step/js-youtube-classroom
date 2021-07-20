import {Repository, Inject, Injectable} from "~@core";
import {YoutubeSearchResult} from "~@domain";

import {YoutubeRestClient} from "~clients";

type YoutubeCacheMap = Record<string, YoutubeSearchResult>;

@Injectable
export class YoutubeSearchService {

  constructor(
    @Inject(YoutubeRestClient)
    private readonly youtubeRestClient: YoutubeRestClient,
    private readonly cache: Repository<YoutubeCacheMap> = new Repository<YoutubeCacheMap>('YOUTUBE_SERVICE_CACHE'),
  ) {}

  private get cacheMap() {
    return this.cache.get() || {};
  }

  private addCache(key: string, value: any) {
    this.cache.set({
      ...this.cacheMap,
      [key]: value
    });
  }

  public async search(q: string, pageToken?: string): Promise<YoutubeSearchResult> {
    const uri = `/search?part=snippet&q=${q}&maxResults=10${pageToken ? `&pageToken=${pageToken}` : ''}`;

    if (this.cacheMap[uri]) {
      return this.cacheMap[uri];
    }

    const result = await this.youtubeRestClient.get<YoutubeSearchResult>(uri);
    this.addCache(uri, result);

    return result;
  }

}
