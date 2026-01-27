import { Module } from '@nestjs/common';
import { TasksInfrastructureModule } from '@tasks/infrastructure/tasks-infrastructure.module';
import { TasksGatewaysModule } from '@tasks/gateways/tasks-gateways.module';
import { TasksDomainModule } from '@tasks/domain/tasks-domain.module';

@Module({
  imports: [TasksDomainModule, TasksInfrastructureModule, TasksGatewaysModule],
})
export class AppTasksModule {}
