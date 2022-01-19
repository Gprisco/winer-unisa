import { Inject, Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';

@Injectable()
export class HasherService {
  @Inject('HASH_ALGO')
  private bcrypt: typeof bcrypt;

  async compare(plainText: string, hash: string): Promise<boolean> {
    return await this.bcrypt.compare(plainText, hash);
  }

  async hash(plainText: string): Promise<string> {
    return await this.bcrypt.hash(plainText, 10);
  }
}
