import { Injectable } from '@nestjs/common';
import { UsersRepositoryService } from '@project-manager-api/infrastructure/database/repositories/users.repository.service';
import { BaseUseCase } from '@project-manager-api/domain/use-cases/base-use-case';
import { TasksRepositoryService } from '@tasks/infrastructure/database/repositories/tasks.repository.service';
import { ITask } from '@tasks/domain/interfaces/task.interface';

@Injectable()
export class GetTaskByIdService implements BaseUseCase {
  constructor(
    private readonly usersRepository: UsersRepositoryService,
    private readonly tasksRepository: TasksRepositoryService,
  ) {}
  async execute(payload: { taskId: number; userId: number }): Promise<ITask> {
    const userData = await this.usersRepository.findById(payload.userId);
    if (!userData) {
      throw new Error('Usuário não encontrado');
    }
    const task = await this.tasksRepository.findById(
      payload.userId,
      payload.taskId,
    );
    if (!task) {
      throw new Error('Erro ao listar tarefas');
    }
    return task;
  }
}
