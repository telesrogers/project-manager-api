import { PartialType } from '@nestjs/mapped-types';
import { CreateProjectDto } from '@project-manager-api/gateways/controllers/projects/dtos/create-project.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProjectDto extends PartialType(CreateProjectDto) {
  @ApiProperty()
  id: number;
}
