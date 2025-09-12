import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { UserRepositoryImpl } from '../repositories/user-repository-impl';
import { RegisterUserUseCase } from '../../application/usecases/register-user.usecase';
import { RegisterUserDto } from '../../domain/contracts/dtos/request/register-user-dto';

@Controller('api/v1/users')
export class UserController {
  constructor(private readonly userRepo: UserRepositoryImpl) {}

  @Post('register')
  async register(@Body() dto: RegisterUserDto) {
    try {
      const useCase = new RegisterUserUseCase(this.userRepo);
      const user = await useCase.executeCreateUser(dto.email, dto.password);
      return {
        id: user.id,
        email: user.email,
        createdAt: user.createdAt,
        updateAt: user.updatedAt,
      };
    } catch (e: unknown) {
      throw new BadRequestException((e as Error).message);
    }
  }
}
