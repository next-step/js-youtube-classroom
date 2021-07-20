import {RestClient, Injectable} from "~@core";
import {YOUTUBE_API_KEY} from "./secret";

@Injectable
export class YoutubeRestClient extends RestClient {

  constructor(private readonly apiKey: string = YOUTUBE_API_KEY) {
    super(`https://www.googleapis.com/youtube/v3/`);
  }

  public get <T>(uri: string): Promise<T> {
    const appendedUri = new URL(`.${uri}`, this.baseUrl);
    appendedUri.searchParams.set('key', this.apiKey);
    return super.get<T>(appendedUri.toString());
  }

}
