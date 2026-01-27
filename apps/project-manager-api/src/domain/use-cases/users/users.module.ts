import { Module } from '@nestjs/common';
import { CreateUserService } from '@project-manager-api/domain/use-cases/users/create-user.service';
import { GetUserByIdService } from '@project-manager-api/domain/use-cases/users/get-user-by-id.service';
import { DatabaseModule } from '@project-manager-api/infrastructure/database/database.module';
import { GetAllUsersService } from '@project-manager-api/domain/use-cases/users/get-all-users.service';
import { GetUserByEmailService } from '@project-manager-api/domain/use-cases/users/get-user-by-email.service';
import { UpdateUserService } from '@project-manager-api/domain/use-cases/users/update-user.service';

@Module({
  imports: [DatabaseModule],
  providers: [
    CreateUserService,
    GetUserByIdService,
    GetAllUsersService,
    GetUserByEmailService,
    UpdateUserService,
  ],
  exports: [
    CreateUserService,
    GetUserByIdService,
    GetAllUsersService,
    GetUserByEmailService,
    UpdateUserService,
  ],
})
export class UsersModule {}
