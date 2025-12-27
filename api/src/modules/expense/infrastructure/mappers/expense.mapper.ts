import { InferSelectModel } from 'drizzle-orm';
import { expenses } from '../../../../db/schema';
import { Expense } from '../../domain/models/expense.model';

export class ExpenseMapper {
  static toDomain(raw: InferSelectModel<typeof expenses>): Expense {
    return {
      id: raw.id,
      description: raw.description,
      amount: raw.amount,
      category: raw.category,
      billType: raw.billType,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt
    };
  }

  static toDomainList(rawList: InferSelectModel<typeof expenses>[]): Expense[] {
    return rawList.map(r => this.toDomain(r));
  }

  static toPersistence(domain: Expense) {
    return {
      id: domain.id,
      description: domain.description,
      amount: domain.amount,
      category: domain.category,
      billType: domain.billType,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt
    };
  }
}