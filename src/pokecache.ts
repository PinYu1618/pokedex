type CacheEntry<T> = {
  /** 
   * The value of `Date.now()` when 
   * the entry was created.
   */
  createdAt: number;
  /** 
   * The cached object.
   */
  val: T;
};

export class Cache {
  #cache = new Map<string, CacheEntry<any>>();
  #reapIntervalId: NodeJS.Timeout | undefined = undefined;
  #interval: number;

  constructor(interval: number) {
    this.#interval = interval;
    this.#startReapLoop();
  }

  add<T>(key: string, val: T) {
    const entry: CacheEntry<T> = { createdAt: Date.now(), val };
    this.#cache.set(key, entry);
  }

  /** 
   * Get the stored object based on the key.
   * 
   * @param key - The cache key.
   * @returns The stored object or `undefined` if the entry is missing.
  */
  get<T>(key: string): T | undefined {
    return this.#cache.get(key)?.val;
  }

  stopReapLoop() {
    clearInterval(this.#reapIntervalId);
    this.#reapIntervalId = undefined;
  }

  #reap() {
    for (const [k, v] of this.#cache) {
      if (v.createdAt < Date.now() - this.#interval) {
        this.#cache.delete(k);
      }
    }
  }

  #startReapLoop() {
    const intervalId = setInterval(this.#reap, this.#interval);
    this.#reapIntervalId = intervalId;
  }
}
