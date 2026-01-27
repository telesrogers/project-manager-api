import { NestFactory } from '@nestjs/core';
import { AppTasksModule } from '@tasks/app-tasks-module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppTasksModule);

  app.connectMicroservice(
    {
      transport: Transport.REDIS,
      options: {
        host: 'localhost',
        port: 6379,
      },
    },
    { inheritAppConfig: true },
  );

  await app.startAllMicroservices();
}
bootstrap();
