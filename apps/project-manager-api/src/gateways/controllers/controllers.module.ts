import { Module } from '@nestjs/common';
import { ProjectsController } from '@project-manager-api/gateways/controllers/projects/projects.controller';
import { TasksController } from '@project-manager-api/gateways/controllers/tasks/tasks.controller';
import { UsersController } from '@project-manager-api/gateways/controllers/users/users.controller';
import { UseCasesModule } from '@project-manager-api/domain/use-cases/use-cases.module';
import { AuthController } from '@project-manager-api/gateways/controllers/auth/auth.controller';
import { AuthModule } from '@project-manager-api/infrastructure/auth/auth.module';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    UseCasesModule,
    AuthModule,
    ClientsModule.register([
      {
        name: 'PROJECTS_MANAGER_API',
        transport: Transport.REDIS,
        options: {
          host: 'localhost',
          port: 6379,
        },
      },
    ]),
  ],
  controllers: [
    ProjectsController,
    TasksController,
    UsersController,
    AuthController,
  ],
})
export class ControllersModule {}
