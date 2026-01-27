import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Inject,
  NotFoundException,
  Param,
  Post,
  Put,
  Req,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateProjectService } from '@project-manager-api/domain/use-cases/projects/create-project.service';
import { GetAllProjectsService } from '@project-manager-api/domain/use-cases/projects/get-all-projects.service';
import { GetProjectByIdService } from '@project-manager-api/domain/use-cases/projects/get-project-by-id.service';
import { UpdateProjectService } from '@project-manager-api/domain/use-cases/projects/update-project.service';
import { CreateProjectDto } from '@project-manager-api/gateways/controllers/projects/dtos/create-project.dto';
import { UpdateProjectDto } from '@project-manager-api/gateways/controllers/projects/dtos/update-project.dto';
import type { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { ApiResponse, ApiOperation } from '@nestjs/swagger';

@Controller('projects')
export class ProjectsController {
  constructor(
    private readonly getAllProjectsUseCase: GetAllProjectsService,
    private readonly getProjectByIdUseCase: GetProjectByIdService,
    private readonly createProjectUseCase: CreateProjectService,
    private readonly updateProjectUseCase: UpdateProjectService,
    @Inject(CACHE_MANAGER) private readonly cacheService: Cache,
  ) {}

  @ApiOperation({ summary: 'Listar todos os projetos' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Retorna todos os projetos',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Nenhum projeto encontrado',
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
      const cacheKey = `user-${loggedUser.sub}/all-projects`;

      const cachedData = await this.cacheService.get<{ name: string }>(
        cacheKey,
      );

      if (cachedData) {
        console.log(`Getting projects from cache!`);
        return cachedData;
      }

      console.log(`Cache empty. Getting projects from database!`);
      const data = await this.getAllProjectsUseCase.execute(loggedUser.sub);
      await this.cacheService.set(cacheKey, data);

      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw new NotFoundException(error.message);
      } else {
        throw new NotFoundException(String(error));
      }
    }
  }

  @ApiOperation({ summary: 'Obter projeto por ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Retorna um projeto pelo ID',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Projeto não encontrado',
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
      return await this.getProjectByIdUseCase.execute({
        userId: loggedUser.sub,
        projectId: id,
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new NotFoundException(error.message);
      } else {
        throw new NotFoundException(String(error));
      }
    }
  }

  @ApiOperation({ summary: 'Criar projeto' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Projeto criado com sucesso',
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
  async create(@Req() request, @Body() createProjectDto: CreateProjectDto) {
    try {
      const loggedUser = request.user;

      return await this.createProjectUseCase.execute({
        userId: loggedUser.sub,
        project: createProjectDto,
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new UnprocessableEntityException(error.message);
      } else {
        throw new UnprocessableEntityException(String(error));
      }
    }
  }

  @ApiOperation({ summary: 'Atualizar projeto' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Projeto atualizado com sucesso',
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
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    try {
      const loggedUser = request.user;
      return await this.updateProjectUseCase.execute({
        userId: loggedUser.sub,
        project: { ...updateProjectDto, id: +id },
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new UnprocessableEntityException(error.message);
      } else {
        throw new UnprocessableEntityException(String(error));
      }
    }
  }
}
