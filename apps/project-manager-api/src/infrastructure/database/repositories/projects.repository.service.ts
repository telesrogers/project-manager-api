import { Injectable } from '@nestjs/common';
import { ProjectEntity } from '../entities/project.entity';
import { DataSource, DeepPartial, Repository } from 'typeorm';
import { IProject } from '@project-manager-api/domain/interfaces/project.interface';
import { IProjectsRepository } from '@project-manager-api/domain/repositories/projects-repository.interface';

@Injectable()
export class ProjectsRepositoryService
  extends Repository<ProjectEntity>
  implements IProjectsRepository
{
  constructor(dataSource: DataSource) {
    super(ProjectEntity, dataSource.createEntityManager());
  }

  findAll(userId: number): Promise<IProject[]> {
    return this.findBy({ user: { id: userId } });
  }

  findById(userId: number, id: number): Promise<IProject | null> {
    return this.findOneOrFail({
      relations: { tasks: true },
      where: { id, user: { id: userId } },
    });
  }

  add(payload: DeepPartial<IProject>): Promise<IProject> {
    return this.save(payload);
  }

  updateById(userId: number, payload: DeepPartial<IProject>) {
    if (payload.id) {
      return this.update(payload.id, { ...payload, user: { id: userId } });
    }
    throw new Error('Payload inválido. Id não encontrado');
  }
}
