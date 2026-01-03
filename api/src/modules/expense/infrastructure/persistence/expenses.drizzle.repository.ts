import { Injectable, Inject } from '@nestjs/common';
import { expenses } from '../../../../db/schema';
import { between, eq } from 'drizzle-orm';
import { IExpensesRepository } from '../../domain/repositories/expenses.repository.interface';
import { LibSQLDatabase } from 'drizzle-orm/libsql';
import { DRIZZLE } from 'src/db/db.module';
import * as schema from '../../../../db/schema';
import { Expense } from '../../domain/models/expense.model';
import { ExpenseMapper } from '../mappers/expense.mapper';

@Injectable()
export class ExpensesDrizzleRepository implements IExpensesRepository {
    constructor(
        @Inject(DRIZZLE) private db: LibSQLDatabase<typeof schema>
    ) { }

    async findAll(): Promise<Expense[]> {
        const raw = await this.db.select().from(schema.expenses);
        return ExpenseMapper.toDomainList(raw);
    }

    async findById(id: number): Promise<Expense | null> {
        const raw = await this.db.select().from(schema.expenses).where(eq(schema.expenses.id, id)).limit(1);
        return raw.length ? ExpenseMapper.toDomain(raw[0]) : null;
    }

    async create(data: Expense): Promise<Expense> {
        console.log('Creating expense:', data);
        const persistenceData = ExpenseMapper.toPersistence(data);
        const raw = await this.db
            .insert(expenses)
            .values(persistenceData)
            .returning();

        return ExpenseMapper.toDomain(raw[0]);
    }

    async delete(id: number): Promise<{ deletedId: number }[]> {
        return await this.db
            .delete(expenses)
            .where(eq(expenses.id, id))
            .returning({
                deletedId: expenses.id
            });
    }

    async deleteRange(idFrom: number, idTo: number): Promise<{ deletedId: number }[]> {
        return await this.db
            .delete(expenses)
            .where(between(expenses.id, idFrom, idTo))
            .returning({
                deletedId: expenses.id
            });
    }
}