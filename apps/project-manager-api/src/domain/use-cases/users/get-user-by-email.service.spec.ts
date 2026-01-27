import { Test, TestingModule } from '@nestjs/testing';
import { GetUserByEmailService } from '@project-manager-api/domain/use-cases/users/get-user-by-email.service';

describe('GetUserByEmailService', () => {
  let service: GetUserByEmailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetUserByEmailService],
    }).compile();

    service = module.get<GetUserByEmailService>(GetUserByEmailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
