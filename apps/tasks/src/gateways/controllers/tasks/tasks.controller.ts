import {
  Controller,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { GetAllTasksService } from '@tasks/domain/use-cases/tasks/get-all-tasks.service';
import { GetTaskByIdService } from '@tasks/domain/use-cases/tasks/get-task-by-id.service';
import { CreateTaskService } from '@tasks/domain/use-cases/tasks/create-task.service';
import { UpdateTaskService } from '@tasks/domain/use-cases/tasks/update-task.service';
import { CreateTaskDto } from '@tasks/gateways/controllers/tasks/dtos/create-task.dto';
import { UpdateTaskDto } from '@tasks/gateways/controllers/tasks/dtos/update-task.dto';

@Controller()
export class TasksController {
  constructor(
    private readonly getAllTasksUseCase: GetAllTasksService,
    private readonly getTaskByIdUseCase: GetTaskByIdService,
    private readonly createTaskUseCase: CreateTaskService,
    private readonly updateTaskUseCase: UpdateTaskService,
  ) {}

  @MessagePattern({ cmd: 'get_tasks' })
  async findAll(@Payload() data: { userId: number }) {
    try {
      console.log('Recebendo mensagem get_tasks em Tasks', data);
      return await this.getAllTasksUseCase.execute({ userId: data.userId });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @MessagePattern({ cmd: 'get_task_by_id' })
  async findOne(@Payload() data: { userId: number; taskId: number }) {
    try {
      console.log('Recebendo mensagem get_task_by_id em Tasks', data);
      return await this.getTaskByIdUseCase.execute({
        userId: data.userId,
        taskId: data.taskId,
      });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @MessagePattern({ cmd: 'create_task' })
  async create(@Payload() data: { task: CreateTaskDto; userId: number }) {
    try {
      console.log('Recebendo mensagem create_task em Tasks', data);
      return await this.createTaskUseCase.execute({
        userId: data.userId,
        task: data.task,
      });
    } catch (error) {
      throw new UnprocessableEntityException(error.message);
    }
  }

  @MessagePattern({ cmd: 'update_task' })
  async update(@Payload() data: { task: UpdateTaskDto; userId: number }) {
    try {
      console.log('Recebendo mensagem update_task em Tasks', data);
      return await this.updateTaskUseCase.execute({
        userId: data.userId,
        task: data.task,
      });
    } catch (error) {
      throw new UnprocessableEntityException(error.message);
    }
  }
}
