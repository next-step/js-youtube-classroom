import { YOUTUBE_API_KEY } from "~services/secret";

interface YoutubeClient {
  init: (option: { apiKey: string }) => Promise<void>,
  youtube: {
    search: {
      list: (option: {q: string, part: string}) => Promise<void>
    }
  }
}

class YoutubeService {
  private activation: boolean = false;
  private client?: YoutubeClient

  constructor() {}

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

  private async request (q: string): Promise<void> {
    return this.client!.youtube.search.list({
      q: q,
      part: 'snippet'
    });
  }

  public async search (q: string) {
    if (!this.activation) {
      await this.init();
    }
    return this.request(q);
  }
}

export const youtubeService = new YoutubeService();

