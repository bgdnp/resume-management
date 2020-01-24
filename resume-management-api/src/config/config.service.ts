import { Injectable } from '@nestjs/common';
import * as config from 'config';

@Injectable()
export class ConfigService {
  get<T>(key: string): T {
    return config.get(key) as T;
  }

  has<T>(key: string): T {
    return config.has(key) as T;
  }
}
