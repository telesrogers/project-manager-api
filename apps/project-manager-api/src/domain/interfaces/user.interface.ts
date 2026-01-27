import { IProject } from '@project-manager-api/domain/interfaces/project.interface';
import { ITask } from '@tasks/domain/interfaces/task.interface';

export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  projects: IProject[];
  tasks: ITask[];
}
