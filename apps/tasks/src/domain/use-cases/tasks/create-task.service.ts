import { Injectable } from '@nestjs/common';
import { UsersRepositoryService } from '@project-manager-api/infrastructure/database/repositories/users.repository.service';
import { ProjectsRepositoryService } from '@project-manager-api/infrastructure/database/repositories/projects.repository.service';
import { BaseUseCase } from '@project-manager-api/domain/use-cases/base-use-case';
import { CreateTaskDto } from '@tasks/gateways/controllers/tasks/dtos/create-task.dto';
import { ITask } from '@tasks/domain/interfaces/task.interface';
import { TasksRepositoryService } from '@tasks/infrastructure/database/repositories/tasks.repository.service';

@Injectable()
export class CreateTaskService implements BaseUseCase {
  constructor(
    private readonly usersRepository: UsersRepositoryService,
    private readonly tasksRepository: TasksRepositoryService,
    private readonly projectsRepository: ProjectsRepositoryService,
  ) {}

  async execute(payload: {
    task: CreateTaskDto;
    userId: number;
  }): Promise<ITask> {
    const userData = await this.usersRepository.findById(payload.userId);

    if (!userData) {
      throw new Error('Usuário não encontrado');
    }

    const projectData = await this.projectsRepository.findById(
      userData.id,
      payload.task.projectId,
    );

    if (!projectData) {
      throw new Error('Projeto não encontrado');
    }

    const createdTask = await this.tasksRepository.add({
      name: payload.task.name,
      status: payload.task.status,
      project: projectData,
      user: { id: userData.id },
    });

    if (!createdTask) {
      throw new Error('Erro ao criar tarefa');
    }
    return createdTask;
  }
}
