import {
  Controller,
  Post,
  Body,
  BadRequestException,
  Get,
  Param,
} from '@nestjs/common';
import { UserRepositoryImpl } from '../repositories/user-repository-impl';
import { RegisterUserDto } from '../../domain/contracts/dtos/request/register-user-dto';
import { RegisterUserUseCase } from '../../application/usecases/register-user.usecase';
import { GetUserByEmailUseCase } from '../../application/usecases/get-user-by-email.usecase';

@Controller('api/v1/users')
export class UserController {
  constructor(private readonly userRepo: UserRepositoryImpl) {}

  @Post('register')
  async register(@Body() dto: RegisterUserDto) {
    try {
      const useCase = new RegisterUserUseCase(this.userRepo);
      const user = await useCase.executeCreateUser(dto.email, dto.password);
      return {
        userId: user.userId,
        email: user.email,
        createdAt: user.createdAt,
        updateAt: user.updatedAt,
      };
    } catch (e: unknown) {
      throw new BadRequestException((e as Error).message);
    }
  }

  @Get('get-user-by-email/:email')
  async getUserByEmail(@Param('email') email: string) {
    try {
      const useCase = new GetUserByEmailUseCase(this.userRepo);
      return await useCase.execute(email);
    } catch (e: unknown) {
      throw new BadRequestException((e as Error).message);
    }
  }
}
