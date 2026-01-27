import { Module } from '@nestjs/common';
import { TasksDatabaseModule } from '@tasks/infrastructure/database/tasks-database.module';

@Module({
  imports: [TasksDatabaseModule],
})
export class TasksInfrastructureModule {}
