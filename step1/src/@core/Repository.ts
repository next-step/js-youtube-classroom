export class Repository<T> {

  constructor(
    private readonly key: string,
    private readonly storage: Storage = localStorage
  ) {}

  get (): T | null {
    return JSON.parse(this.storage.getItem(this.key) || 'null');
  }

  set (value: T) {
    this.storage.setItem(this.key, JSON.stringify(value));
  }

  clear (): void {
    this.storage.removeItem(this.key);
  }

}
