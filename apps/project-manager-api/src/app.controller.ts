import { Controller, Get, HttpStatus } from '@nestjs/common';
import { AppService } from '@project-manager-api/app.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({ summary: 'Ignorar - Hello World para testes apenas' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Retorna mensagem de teste',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Erro interno do servidor',
  })
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
//TODO: Delete this file
