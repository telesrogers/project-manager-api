import { Module } from '@nestjs/common';
import { TasksUseCasesModule } from '@tasks/domain/use-cases/tasks-use-cases.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TasksController } from '@tasks/gateways/controllers/tasks/tasks.controller';

@Module({
  imports: [
    TasksUseCasesModule,
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
  controllers: [TasksController],
})
export class TasksControllersModule {}
