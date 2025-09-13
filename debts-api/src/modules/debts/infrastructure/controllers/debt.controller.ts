import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  BadRequestException,
  Put,
  Delete,
  Patch,
  Query,
  Res,
} from '@nestjs/common';
import type { Response } from 'express';
import { CreateDebtUseCase } from '../../application/usecases/create-debt.usecase';
import { CreateDebtDto } from '../../domain/contracts/dtos/request/create-debt-dto';
import { UpdateDebtDto } from '../../domain/contracts/dtos/request/update-debt.dto';
import { DebtRepositoryImpl } from '../respositories/debt-respository-impl';
import { GetDebtUseCase } from '../../application/usecases/get-debt.usecase';
import { GetAllDebtsUseCase } from '../../application/usecases/get-all-debts.usecase';
import { UserRepositoryImpl } from 'src/modules/users/infrastructure/repositories/user-repository-impl';
import { UpdateDebtUseCase } from '../../application/usecases/update-debt.usecase';
import { DeleteDebtUseCase } from '../../application/usecases/delete-debt.usecase';
import { UpdateDeptStatusUseCase } from '../../application/usecases/update-debt-status.usecase';
import { GetAllDebtsFilterDto } from '../../domain/contracts/dtos/request/get-all-debts-filter-dto';
import { Format } from '../../domain/enums/debt-status';
import { ExportDebtsUseCase } from '../../application/usecases/export-debts.usecase';

@Controller('api/v1/debts')
export class DebtController {
  constructor(
    private readonly debtRepo: DebtRepositoryImpl,
    private readonly userRepo: UserRepositoryImpl,
  ) {}

  @Post('create')
  async create(@Body() dto: CreateDebtDto) {
    try {
      const useCase = new CreateDebtUseCase(this.debtRepo);
      return await useCase.executeCreateDebt(
        dto.description,
        dto.amount,
        dto.userId,
      );
    } catch (e: unknown) {
      throw new BadRequestException((e as Error).message);
    }
  }

  @Get('get-debt-by-id/:debtId')
  async findById(@Param('debtId') debtId: number) {
    return new GetDebtUseCase(this.debtRepo).executeGetDebtById(debtId);
  }

  @Post('get-all-debts-by-user')
  async findAllByUser(@Body() dto: GetAllDebtsFilterDto) {
    return new GetAllDebtsUseCase(
      this.debtRepo,
      this.userRepo,
    ).executeGetAllDebtsByUserId(dto);
  }
  @Put('update-debt')
  async updateDebt(@Body() dto: UpdateDebtDto) {
    try {
      const useCase = new UpdateDebtUseCase(this.debtRepo);
      return await useCase.executeUpdateDebt(
        dto.debtId,
        dto.description,
        dto.amount,
        dto.status,
      );
    } catch (e: unknown) {
      throw new BadRequestException((e as Error).message);
    }
  }
  @Patch('update-debt-status/:debtId')
  async updateDebtStatus(@Param('debtId') debtId: number) {
    try {
      const useCase = new UpdateDeptStatusUseCase(this.debtRepo);
      return await useCase.executeUpdateDebtStatus(debtId);
    } catch (e: unknown) {
      throw new BadRequestException((e as Error).message);
    }
  }

  @Delete('delete-debt/:debtId')
  async deleteDebt(@Param('debtId') debtId: number) {
    try {
      const useCase = new DeleteDebtUseCase(this.debtRepo);
      return await useCase.executeDeleteDebt(debtId);
    } catch (e: unknown) {
      throw new BadRequestException((e as Error).message);
    }
  }

  @Get('export/:userId')
  async exportDebts(
    @Param('userId') userId: number,
    @Query('format') format: Format = Format.JSON,
    @Res() res: Response,
  ) {
    try {
      const useCase = new ExportDebtsUseCase(this.debtRepo, this.userRepo);
      const result = await useCase.executeExportDebts(userId, format);

      res.header('Content-Type', result.contentType);
      res.setHeader(
        'Content-Disposition',
        `attachment; filename="${result.filename}"`,
      );
      res.attachment(result.filename);
      return res.send(result.data);
    } catch (e: unknown) {
      throw new BadRequestException((e as Error).message);
    }
  }
}
