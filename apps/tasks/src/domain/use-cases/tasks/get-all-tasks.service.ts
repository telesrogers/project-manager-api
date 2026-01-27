import { Injectable } from '@nestjs/common';
import { BaseUseCase } from '@project-manager-api/domain/use-cases/base-use-case';
import { TasksRepositoryService } from '@tasks/infrastructure/database/repositories/tasks.repository.service';
import { ITask } from '@tasks/domain/interfaces/task.interface';
import { UsersRepositoryService } from '@project-manager-api/infrastructure/database/repositories/users.repository.service';

@Injectable()
export class GetAllTasksService implements BaseUseCase {
  constructor(
    private readonly usersRepository: UsersRepositoryService,
    private readonly tasksRepository: TasksRepositoryService,
  ) {}
  async execute(payload: { userId: number }): Promise<ITask[]> {
    const userData = await this.usersRepository.findById(payload.userId);
    if (!userData) {
      throw new Error('Usuário não encontrado');
    }
    const tasks = await this.tasksRepository.findAll(payload.userId);
    if (!tasks) {
      throw new Error('Erro ao listar tarefas');
    }

    if (tasks.length === 0) {
      throw new Error('Nenhuma tarefa encontrada');
    }

    return tasks;
  }
}
