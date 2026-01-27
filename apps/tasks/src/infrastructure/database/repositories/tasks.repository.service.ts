import { Injectable } from '@nestjs/common';
import { DataSource, DeepPartial, Repository } from 'typeorm';
import { TaskEntity } from '@tasks/infrastructure/database/entities/task.entity';
import { ITasksRepository } from '@tasks/domain/repositories/tasks-repository.interface';
import { ITask } from '@tasks/domain/interfaces/task.interface';

@Injectable()
export class TasksRepositoryService
  extends Repository<TaskEntity>
  implements ITasksRepository
{
  constructor(dataSource: DataSource) {
    super(TaskEntity, dataSource.createEntityManager());
  }

  findAll(userId: number): Promise<ITask[]> {
    return this.findBy({ user: { id: userId } });
  }

  findById(userId: number, id: number): Promise<ITask | null> {
    return this.findOneByOrFail({ id, user: { id: userId } });
  }

  add(payload: DeepPartial<ITask>): Promise<ITask> {
    return this.save(payload) as Promise<ITask>;
  }

  updateById(userId: number, payload: DeepPartial<ITask>) {
    if (payload.id) {
      return this.update(payload.id, {
        ...payload,
        user: { id: userId },
        project: { id: payload.project?.id },
      });
    }

    throw new Error('Payload inválido. Id não encontrado');
  }
}
