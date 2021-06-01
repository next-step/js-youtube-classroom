enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

export class RestClient {

  constructor(
    protected readonly baseUrl: string
  ) {}

  private request<T> (method: HttpMethod, uri: string): Promise<T> {
    const url = new URL(uri, this.baseUrl);
    return fetch(url.href, { method }).then(response => response.json());
  }

  private requestWithBody<T, B> (method: HttpMethod, uri: string, body: B): Promise<T> {
    const url = new URL(uri, this.baseUrl);
    return fetch(url.href, { method, body: JSON.stringify(body) }).then(response => response.json());
  }

  public get<T> (uri: string): Promise<T> {
    return this.request<T>(HttpMethod.GET, uri);
  }

  public post<T, B> (uri: string, body: B): Promise<T> {
    return this.requestWithBody<T, B>(HttpMethod.POST, uri, body);
  }

  public patch<T, B> (uri: string, body: B): Promise<T> {
    return this.requestWithBody<T, B>(HttpMethod.PATCH, uri, body);
  }

  public put<T, B> (uri: string, body: B): Promise<T> {
    return this.requestWithBody<T, B>(HttpMethod.PUT, uri, body);
  }

  public delete<T> (uri: string): Promise<T> {
    return this.request(HttpMethod.DELETE, uri);
  }
}
