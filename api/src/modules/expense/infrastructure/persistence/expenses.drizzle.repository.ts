import { Injectable, Inject } from '@nestjs/common';
import { expenses } from '../../../../db/schema';
import { between, count, eq } from 'drizzle-orm';
import { IExpensesRepository } from '../../domain/repositories/expenses.repository.interface';
import { LibSQLDatabase } from 'drizzle-orm/libsql';
import { DRIZZLE } from 'src/db/db.module';
import * as schema from '../../../../db/schema';
import { Expense } from '../../domain/models/expense.model';
import { ExpenseMapper } from '../mappers/expense.mapper';
import { PaginatedResult } from 'src/core/DTOs/paginated-result.dto';

@Injectable()
export class ExpensesDrizzleRepository implements IExpensesRepository {
    constructor(
        @Inject(DRIZZLE) private db: LibSQLDatabase<typeof schema>
    ) { }

    async findAll(): Promise<Expense[]> {
        const raw = await this.db.select().from(schema.expenses);

        // const raw = await this.db.query.expenses.findMany({
        //     with: {
        //     reports: true, // Esto trae automáticamente los monthlyReports vinculados
        //     },
        // });

        return ExpenseMapper.toDomainList(raw);
    }

    async findAllPaginated(
        page: number,
        limit: number,
    ): Promise<PaginatedResult<Expense>> {
        const offset = (page - 1) * limit;

        const [data, totalResult] = await Promise.all([
            this.db.select()
                .from(schema.expenses)
                .limit(limit)
                .offset(offset)
                .all(),
            this.db.select({ value: count() })
                .from(schema.expenses)
        ]);

        const total = totalResult[0].value;
        const totalPages = Math.ceil(total / limit);

        return {
            data: data.map(ExpenseMapper.toDomain),
            page,
            limit,
            total,
            totalPages
        };
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