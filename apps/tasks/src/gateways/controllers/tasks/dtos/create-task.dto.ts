import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'O nome da tarefa precisa ser definido' })
  @IsString()
  name: string;
  @IsNotEmpty({ message: 'O status da tarefa precisa ser definido' })
  @IsString()
  @ApiProperty()
  status: 'pending' | 'completed';
  @ApiProperty()
  projectId: number;
}
