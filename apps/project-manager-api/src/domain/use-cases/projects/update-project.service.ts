import { Injectable } from '@nestjs/common';
import { BaseUseCase } from '../base-use-case';
import { ProjectsRepositoryService } from '@project-manager-api/infrastructure/database/repositories/projects.repository.service';
import { UsersRepositoryService } from '@project-manager-api/infrastructure/database/repositories/users.repository.service';
import { UpdateProjectDto } from '@project-manager-api/gateways/controllers/projects/dtos/update-project.dto';
import { IProject } from '@project-manager-api/domain/interfaces/project.interface';

@Injectable()
export class UpdateProjectService implements BaseUseCase {
  constructor(
    private readonly usersRepository: UsersRepositoryService,
    private readonly projectsRepository: ProjectsRepositoryService,
  ) {}

  async execute(payload: {
    project: UpdateProjectDto;
    userId: number;
  }): Promise<IProject> {
    const userData = await this.usersRepository.findById(payload.userId);
    if (!userData) {
      throw new Error('Usuário não encontrado');
    }

    await this.projectsRepository.updateById(payload.userId, {
      id: payload.project.id,
      name: payload.project.name,
      description: payload.project.description,
      user: { id: userData.id },
    });

    const updatedProject = await this.projectsRepository.findById(
      payload.userId,
      payload.project.id,
    );

    if (!updatedProject) {
      throw new Error('Projeto não encontrado');
    }

    return updatedProject;
  }
}
