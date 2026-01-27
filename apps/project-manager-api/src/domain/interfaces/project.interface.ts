import { IUser } from '@project-manager-api/domain/interfaces/user.interface';
import { ITask } from '@tasks/domain/interfaces/task.interface';

export interface IProject {
  id: number;
  name: string;
  description: string;
  tasks: ITask[];
  user: IUser;
}
