import { Module } from '@nestjs/common';
import { GetAllTasksService } from '@tasks/domain/use-cases/tasks/get-all-tasks.service';
import { GetTaskByIdService } from '@tasks/domain/use-cases/tasks/get-task-by-id.service';
import { CreateTaskService } from '@tasks/domain/use-cases/tasks/create-task.service';
import { UpdateTaskService } from '@tasks/domain/use-cases/tasks/update-task.service';
import { DatabaseModule } from '@project-manager-api/infrastructure/database/database.module';
import { TasksDatabaseModule } from '@tasks/infrastructure/database/tasks-database.module';

@Module({
  imports: [DatabaseModule, TasksDatabaseModule],
  providers: [
    GetAllTasksService,
    GetTaskByIdService,
    CreateTaskService,
    UpdateTaskService,
  ],
  exports: [
    GetAllTasksService,
    GetTaskByIdService,
    CreateTaskService,
    UpdateTaskService,
  ],
})
export class TasksModule {}
