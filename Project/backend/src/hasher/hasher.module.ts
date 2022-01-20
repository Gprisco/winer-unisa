import { Module } from '@nestjs/common';
import { HasherService } from './hasher.service';

import * as bcrypt from 'bcrypt';

@Module({
  providers: [
    {
      provide: 'HASH_ALGO',
      useValue: bcrypt,
    },
    HasherService,
  ],
  exports: [HasherService],
})
export class HasherModule {}
