import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'O nome do projeto precisa de ser definido' })
  @IsString()
  name: string;
  @ApiProperty()
  @IsNotEmpty({ message: 'A descrição do projeto precisa de ser definida' })
  @IsString()
  description: string;
}
