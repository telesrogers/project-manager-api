import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ProjectEntity } from '@project-manager-api/infrastructure/database/entities/project.entity';
import type { IProject } from '@project-manager-api/domain/interfaces/project.interface';
import type { IUser } from '@project-manager-api/domain/interfaces/user.interface';
import { TaskEntity } from '@tasks/infrastructure/database/entities/task.entity';
import { ITask } from '@tasks/domain/interfaces/task.interface';

@Entity('user')
export class UserEntity implements IUser {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ name: 'firstName', nullable: false })
  firstName: string;
  @Column({ name: 'lastName' })
  lastName: string;
  @Column({ name: 'email', nullable: false })
  email: string;
  @Column({ name: 'password', nullable: false })
  password: string;
  @OneToMany(() => ProjectEntity, (project) => project.user)
  projects: IProject[];
  @OneToMany(() => TaskEntity, (task) => task.user)
  tasks: ITask[];
}
