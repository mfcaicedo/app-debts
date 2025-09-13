import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DebtRepository } from '../../domain/contracts/debt.repository';
import { Debt } from '../../domain/entities/debt.entity';
import { DebtStatus } from '../../domain/enums/debt-status';
import { DebtOrmEntity } from '../debt.orm-entity';

@Injectable()
export class DebtRepositoryImpl implements DebtRepository {
  constructor(
    @InjectRepository(DebtOrmEntity)
    private readonly repo: Repository<DebtOrmEntity>,
  ) {}

  async save(debt: Debt): Promise<Debt> {
    const orm = this.repo.create({
      description: debt.description,
      amount: debt.amount,
      status: debt.status,
      userId: debt.userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const saved = await this.repo.save(orm);
    return new Debt(
      saved.description,
      +saved.amount,
      saved.status as DebtStatus,
      saved.userId,
      saved.debtId,
      saved.createdAt,
      saved.updatedAt,
    );
  }

  async findById(debtId: number): Promise<Debt | null> {
    const found = await this.repo.findOne({ where: { debtId } });
    return found
      ? new Debt(
          found.description,
          +found.amount,
          found.status as DebtStatus,
          found.userId,
          found.debtId,
          found.createdAt,
          found.updatedAt,
        )
      : null;
  }

  async findAllByUserId(userId: number, status?: DebtStatus): Promise<Debt[]> {
    const where: { userId: number; status?: DebtStatus } = { userId };
    if (status) {
      where.status = status;
    }
    const debts = await this.repo.find({
      where,
      order: { createdAt: 'DESC' },
    });
    return debts.map(
      (d) =>
        new Debt(
          d.description,
          +d.amount,
          d.status as DebtStatus,
          d.userId,
          d.debtId,
          d.createdAt,
          d.updatedAt,
        ),
    );
  }

  async findByDebtIdAndUserId(
    debtId: number,
    userId: number,
  ): Promise<Debt | null> {
    return this.repo
      .findOne({ where: { debtId, userId } })
      .then((found) =>
        found
          ? new Debt(
              found.description,
              +found.amount,
              found.status as DebtStatus,
              found.userId,
              found.debtId,
              found.createdAt,
              found.updatedAt,
            )
          : null,
      );
  }

  async update(debt: Debt): Promise<Debt> {
    return await this.repo.save(debt);
  }

  async delete(debtId: number): Promise<void> {
    await this.repo.delete(debtId);
  }
}
