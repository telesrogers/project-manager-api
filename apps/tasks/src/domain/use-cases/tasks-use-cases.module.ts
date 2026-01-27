import { Module } from '@nestjs/common';
import { TasksModule } from '@tasks/domain/use-cases/tasks/tasks.module';

@Module({
  imports: [TasksModule],
  exports: [TasksModule],
})
export class TasksUseCasesModule {}
