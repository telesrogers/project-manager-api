import { Module } from '@nestjs/common';
import { ProjectsRepositoryService } from '@project-manager-api/infrastructure/database/repositories/projects.repository.service';
import { UsersRepositoryService } from '@project-manager-api/infrastructure/database/repositories/users.repository.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@project-manager-api/infrastructure/database/entities/user.entity';
import { ProjectEntity } from '@project-manager-api/infrastructure/database/entities/project.entity';
import { TaskEntity } from '@tasks/infrastructure/database/entities/task.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, ProjectEntity, TaskEntity]),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db/sql.sqlite',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
      autoLoadEntities: true,
    }),
  ],
  providers: [ProjectsRepositoryService, UsersRepositoryService],
  exports: [ProjectsRepositoryService, UsersRepositoryService],
})
export class DatabaseModule {}
