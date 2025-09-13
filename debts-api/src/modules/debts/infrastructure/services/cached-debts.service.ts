import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import type { Cache } from 'cache-manager';

@Injectable()
export class CachedDebtService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  private buildKey(
    parts: Array<string | number | boolean | null | undefined>,
  ): string {
    return parts
      .filter((p) => p !== null && p !== undefined && String(p) !== '')
      .join(':');
  }

  async getCached<T>(
    keyParts: Array<string | number | boolean | null | undefined>,
    fetchFn: () => Promise<T>,
    ttlSeconds = 60 * 1000, // 1 minuto
  ): Promise<T> {
    const key = `debts:${this.buildKey(keyParts)}`;
    const cached = await this.cacheManager.get<T>(key);
    if (cached) {
      return cached;
    }
    const data = await fetchFn();
    await this.cacheManager.set(key, data, ttlSeconds);
    return data;
  }

  // invalidar todas las keys relacionadas al usuario
  async invalidateCacheByUser(userId: number) {
    const client = (this.cacheManager as any).store?.getClient?.();
    if (!client) return;

    const pattern = `debts:user:${userId}:*`;
    if (client.scanStream) {
      const stream = client.scanStream({ match: pattern });
      const keys: string[] = [];
      for await (const ks of stream) keys.push(...ks);
      if (keys.length) await client.del(keys);
    } else if (client.keys) {
      const keys = await client.keys(pattern);
      if (keys.length) await client.del(keys);
    }
  }
}
