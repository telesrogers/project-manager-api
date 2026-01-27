import { Injectable } from '@nestjs/common';
import { BaseUseCase } from '../base-use-case';
import { IUser } from '@project-manager-api/domain/interfaces/user.interface';
import { UsersRepositoryService } from '@project-manager-api/infrastructure/database/repositories/users.repository.service';

@Injectable()
export class GetAllUsersService implements BaseUseCase {
  constructor(private readonly usersRepository: UsersRepositoryService) {}
  async execute(): Promise<IUser[]> {
    const users = await this.usersRepository.findAll();
    if (!users) {
      throw new Error('Erro ao listar usuários');
    }

    if (users.length === 0) {
      throw new Error('Nenhum usuário encontrado');
    }

    return users;
  }
}
