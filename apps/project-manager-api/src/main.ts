import { NestFactory } from '@nestjs/core';
import { AppModule } from '@project-manager-api/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const apiDocumentBuilder = new DocumentBuilder()
    .setTitle('Project Manager API')
    .setVersion('1.0')
    .build();

  const apiDocumentation = SwaggerModule.createDocument(
    app,
    apiDocumentBuilder,
  );
  SwaggerModule.setup('docs', app, apiDocumentation);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
