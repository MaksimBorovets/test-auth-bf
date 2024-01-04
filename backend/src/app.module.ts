import { Module } from '@nestjs/common';
import { AppController } from './app.controller';

import { CommonModule } from './common/modules/common.module';
import { AuthModule } from './api/auth/auth.module';
import { UserModule } from './api/user/user.module';

@Module({
  imports: [CommonModule, AuthModule, UserModule],
  controllers: [AppController],
})
export class AppModule {}
