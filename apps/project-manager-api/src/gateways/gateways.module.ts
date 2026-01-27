import { Module } from '@nestjs/common';
import { ControllersModule } from '@project-manager-api/gateways/controllers/controllers.module';
import { AuthGuardService } from '@project-manager-api/gateways/guards/auth-guard.service';

@Module({
  imports: [ControllersModule],
  providers: [AuthGuardService],
  exports: [AuthGuardService],
})
export class GatewaysModule {}
