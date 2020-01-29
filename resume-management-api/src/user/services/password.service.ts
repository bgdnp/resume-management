import { Injectable } from '@nestjs/common';
import { compare, hash, genSaltSync } from 'bcrypt';

@Injectable()
export class PasswordService {
  hash(password: string): Promise<string> {
    return hash(password, genSaltSync());
  }

  compare(password, hash): Promise<boolean> {
    return compare(password, hash);
  }
}
