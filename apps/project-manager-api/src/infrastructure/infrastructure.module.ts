import { Module } from '@nestjs/common';
import { DatabaseModule } from '@project-manager-api/infrastructure/database/database.module';
import { AuthModule } from '@project-manager-api/infrastructure/auth/auth.module';
import { RedisModule } from '@project-manager-api/infrastructure/redis/redis.module';

@Module({
  imports: [DatabaseModule, AuthModule, RedisModule],
})
export class InfrastructureModule {}
