import { DeepPartial, UpdateResult } from 'typeorm';
import { ITask } from '@tasks/domain/interfaces/task.interface';

export interface ITasksRepository {
  findAll(userId: number): Promise<ITask[]>;
  findById(userId: number, id: number): Promise<ITask | null>;
  add(payload: DeepPartial<ITask>): Promise<ITask>;
  updateById(
    userId: number,
    payload: DeepPartial<ITask>,
  ): Promise<UpdateResult> | null;
}
