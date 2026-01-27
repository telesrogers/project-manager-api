import { Module } from '@nestjs/common';
import { UseCasesModule } from '@project-manager-api/domain/use-cases/use-cases.module';

@Module({
  imports: [UseCasesModule],
  exports: [UseCasesModule],
})
export class DomainModule {}
