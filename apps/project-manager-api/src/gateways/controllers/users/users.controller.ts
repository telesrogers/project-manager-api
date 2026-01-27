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
import { CreateUserService } from '@project-manager-api/domain/use-cases/users/create-user.service';
import { GetUserByIdService } from '@project-manager-api/domain/use-cases/users/get-user-by-id.service';
import { GetAllUsersService } from '@project-manager-api/domain/use-cases/users/get-all-users.service';
import { UpdateUserService } from '@project-manager-api/domain/use-cases/users/update-user.service';
import { CreateUserDto } from '@project-manager-api/gateways/controllers/users/dtos/create-user.dto';
import { UpdateUserDto } from '@project-manager-api/gateways/controllers/users/dtos/update-user.dto';
import { Public } from '@project-manager-api/gateways/guards/auth-guard.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';

@Controller('users')
export class UsersController {
  constructor(
    private readonly getAllUsersUseCase: GetAllUsersService,
    private readonly getUserUseCase: GetUserByIdService,
    private readonly createUserUseCase: CreateUserService,
    private readonly updateUserUseCase: UpdateUserService,
    @Inject(CACHE_MANAGER) private readonly cacheService: Cache,
  ) {}

  @ApiOperation({ summary: 'Listar todos os usuários' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Retorna todos os usuários',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Nenhum usuário encontrado',
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
      const cacheKey = `user-${loggedUser.sub}/all-users`;

      const cachedData = await this.cacheService.get<{ name: string }>(
        cacheKey,
      );

      if (cachedData) {
        console.log(`Getting users from cache!`);
        return cachedData;
      }

      console.log(`Cache empty. Getting users from database!`);
      const data = await this.getAllUsersUseCase.execute();
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

  @ApiOperation({ summary: 'Obter usuário por ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Retorna um usuário pelo ID',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Usuário não encontrado',
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
  async findOne(@Param('id') id: number) {
    try {
      return await this.getUserUseCase.execute(+id);
    } catch (error) {
      if (error instanceof Error) {
        throw new NotFoundException(error.message);
      } else {
        throw new NotFoundException(String(error));
      }
    }
  }

  @ApiOperation({ summary: 'Criar usuário' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Usuário criado com sucesso',
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
  @Public()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.createUserUseCase.execute({ ...createUserDto });
    } catch (error) {
      if (error instanceof Error) {
        throw new UnprocessableEntityException(error.message);
      } else {
        throw new UnprocessableEntityException(String(error));
      }
    }
  }

  @ApiOperation({ summary: 'Atualizar usuário' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Usuário atualizado com sucesso',
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
  @Public()
  async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    try {
      return await this.updateUserUseCase.execute({
        user: { ...updateUserDto, id: +id },
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
