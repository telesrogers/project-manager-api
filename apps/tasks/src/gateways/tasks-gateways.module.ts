import { Module } from '@nestjs/common';
import { TasksControllersModule } from '@tasks/gateways/controllers/tasks-controllers.module';

@Module({
  imports: [TasksControllersModule],
})
export class TasksGatewaysModule {}
