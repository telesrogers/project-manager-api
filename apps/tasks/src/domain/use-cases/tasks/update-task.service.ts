import { Injectable } from '@nestjs/common';
import { UsersRepositoryService } from '@project-manager-api/infrastructure/database/repositories/users.repository.service';
import { ProjectsRepositoryService } from '@project-manager-api/infrastructure/database/repositories/projects.repository.service';
import { BaseUseCase } from '@project-manager-api/domain/use-cases/base-use-case';
import { TasksRepositoryService } from '@tasks/infrastructure/database/repositories/tasks.repository.service';
import { ITask } from '@tasks/domain/interfaces/task.interface';
import { UpdateTaskDto } from '@tasks/gateways/controllers/tasks/dtos/update-task.dto';

@Injectable()
export class UpdateTaskService implements BaseUseCase {
  constructor(
    private readonly usersRepository: UsersRepositoryService,
    private readonly tasksRepository: TasksRepositoryService,
    private readonly projectsRepository: ProjectsRepositoryService,
  ) {}

  async execute(payload: {
    task: UpdateTaskDto;
    userId: number;
  }): Promise<ITask> {
    const userData = await this.usersRepository.findById(payload.userId);

    if (!userData) {
      throw new Error('Usuário não encontrado');
    }

    const projectData = await this.projectsRepository.findById(
      userData.id,
      payload.task?.projectId ?? 0,
    );

    if (!projectData) {
      throw new Error('Projeto não encontrado');
    }

    await this.tasksRepository.updateById(payload.userId, {
      id: payload.task.id,
      name: payload.task.name,
      status: payload.task.status,
      project: projectData,
      user: { id: userData.id },
    });

    const updatedTask = await this.tasksRepository.findById(
      payload.userId,
      payload.task.id,
    );

    if (!updatedTask) {
      throw new Error('Tarefa não encontrado');
    }

    return updatedTask;
  }
}
