import { Module } from '@nestjs/common';
import { AppController } from '@project-manager-api/app.controller';
import { AppService } from '@project-manager-api/app.service';
import { DomainModule } from '@project-manager-api/domain/domain.module';
import { InfrastructureModule } from '@project-manager-api/infrastructure/infrastructure.module';
import { GatewaysModule } from '@project-manager-api/gateways/gateways.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuardService } from '@project-manager-api/gateways/guards/auth-guard.service';

@Module({
  imports: [DomainModule, InfrastructureModule, GatewaysModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuardService,
    },
  ],
})
export class AppModule {}

//TODO: Remover AppService & AppController
