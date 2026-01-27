import { Module } from '@nestjs/common';
import { GetAllProjectsService } from '@project-manager-api/domain/use-cases/projects/get-all-projects.service';
import { GetProjectByIdService } from '@project-manager-api/domain/use-cases/projects/get-project-by-id.service';
import { CreateProjectService } from '@project-manager-api/domain/use-cases/projects/create-project.service';
import { UpdateProjectService } from '@project-manager-api/domain/use-cases/projects/update-project.service';
import { DatabaseModule } from '@project-manager-api/infrastructure/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [
    GetAllProjectsService,
    GetProjectByIdService,
    CreateProjectService,
    UpdateProjectService,
  ],
  exports: [
    GetAllProjectsService,
    GetProjectByIdService,
    CreateProjectService,
    UpdateProjectService,
  ],
})
export class ProjectsModule {}
