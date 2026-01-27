import {
  Body,
  Controller,
  Get,
  Inject,
  NotFoundException,
  Param,
  Post,
  Put,
  Req,
  UnprocessableEntityException,
  HttpStatus,
} from '@nestjs/common';
import { ApiResponse, ApiOperation } from '@nestjs/swagger';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import { ClientProxy } from '@nestjs/microservices';
import { CreateTaskDto } from '@tasks/gateways/controllers/tasks/dtos/create-task.dto';
import { UpdateTaskDto } from '@tasks/gateways/controllers/tasks/dtos/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(
    @Inject('PROJECTS_MANAGER_API') private readonly redisClient: ClientProxy,
  ) {}

  @ApiOperation({ summary: 'Listar todas as tarefas' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Retorna todas as tarefas',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Nenhuma tarefa encontrada',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Não autorizado',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Erro interno do servidor',
  })
  @Get()
  async findAll(@Req() request) {
    try {
      const loggedUser = request.user;
      console.log('Disparando mensagem get_tasks para Tasks', {
        userId: loggedUser.sub,
      });
      return this.redisClient.send(
        { cmd: 'get_tasks' },
        { userId: loggedUser.sub },
      );
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @ApiOperation({ summary: 'Obter tarefa por ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Retorna uma tarefa pelo ID',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Tarefa não encontrada',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Não autorizado',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Erro interno do servidor',
  })
  @Get(':id')
  async findOne(@Req() request, @Param('id') id: number) {
    try {
      const loggedUser = request.user;
      console.log('Disparando mensagem get_task_by_id para Tasks', {
        userId: loggedUser.sub,
        taskId: id,
      });
      return this.redisClient.send(
        { cmd: 'get_task_by_id' },
        {
          userId: loggedUser.sub,
          taskId: id,
        },
      );
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @ApiOperation({ summary: 'Criar tarefa' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Tarefa criada com sucesso',
  })
  @ApiResponse({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    description: 'Não foi possível processar a solicitação',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Não autorizado',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Erro interno do servidor',
  })
  @Post()
  async create(@Req() request, @Body() createTaskDto: CreateTaskDto) {
    try {
      const loggedUser = request.user;
      console.log('Disparando mensagem create_task para Tasks', {
        userId: loggedUser.sub,
        task: createTaskDto,
      });
      return this.redisClient.send(
        { cmd: 'create_task' },
        {
          userId: loggedUser.sub,
          task: createTaskDto,
        },
      );
    } catch (error) {
      throw new UnprocessableEntityException(error.message);
    }
  }

  @ApiOperation({ summary: 'Atualizar tarefa' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Tarefa atualizada com sucesso',
  })
  @ApiResponse({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    description: 'Não foi possível processar a solicitação',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Não autorizado',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Erro interno do servidor',
  })
  @Put(':id')
  async update(
    @Req() request,
    @Param('id') id: number,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    try {
      const loggedUser = request.user;
      console.log('Disparando mensagem update_task para Tasks', {
        userId: loggedUser.sub,
        task: updateTaskDto,
      });
      return this.redisClient.send(
        { cmd: 'update_task' },
        {
          userId: loggedUser.sub,
          task: { ...updateTaskDto, id: +id },
        },
      );
    } catch (error) {
      throw new UnprocessableEntityException(error.message);
    }
  }
}
