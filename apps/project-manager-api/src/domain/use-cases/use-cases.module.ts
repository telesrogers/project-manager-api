import { Module } from '@nestjs/common';
import { ProjectsModule } from '@project-manager-api/domain/use-cases/projects/projects.module';
import { UsersModule } from '@project-manager-api/domain/use-cases/users/users.module';

@Module({
  imports: [ProjectsModule, UsersModule],
  exports: [ProjectsModule, UsersModule],
})
export class UseCasesModule {}
