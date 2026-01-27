import { Module } from '@nestjs/common';
import { TasksUseCasesModule } from '@tasks/domain/use-cases/tasks-use-cases.module';

@Module({
  imports: [TasksUseCasesModule],
  exports: [TasksUseCasesModule],
})
export class TasksDomainModule {}
