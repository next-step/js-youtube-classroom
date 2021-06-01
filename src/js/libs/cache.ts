class cache<T> {
  private data: Map<string, T>;
  constructor() {
    this.data = new Map<string, T>();
  }

  set(key: string, value: T): void {
    this.data.set(key, value);
  }

  has(key: string): boolean {
    return this.data.has(key);
  }

  get(key: string): T {
    return this.data.get(key) as T;
  }

  remove(key: string): void {
    this.data.delete(key);
  }
}

export default cache;
