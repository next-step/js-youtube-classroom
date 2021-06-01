import {YoutubeSearchResult} from "~domain";
import {YoutubeRestClient, youtubeRestClient} from "~clients";
import {Repository} from "~_core";

type YoutubeCacheMap = Record<string, YoutubeSearchResult>;

export class YoutubeService {

  constructor(
    private readonly client: YoutubeRestClient,
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

    const result = await this.client.get<YoutubeSearchResult>(uri);
    this.addCache(uri, result);

    return result;
  }

}

export const youtubeService = new YoutubeService(youtubeRestClient);

