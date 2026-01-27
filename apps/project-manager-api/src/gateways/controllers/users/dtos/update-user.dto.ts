import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from '@project-manager-api/gateways/controllers/users/dtos/create-user.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty()
  id: number;
}
