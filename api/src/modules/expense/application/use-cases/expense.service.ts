import { Inject, Injectable } from '@nestjs/common';
import * as expensesRepositoryInterface from '../../domain/repositories/expenses.repository.interface';
import { Expense } from '../../domain/models/expense.model';
import { start } from 'node:repl';


@Injectable()
export class ExpenseService {
  constructor(
    @Inject('IExpensesRepository')
    private readonly expenseRepo: expensesRepositoryInterface.IExpensesRepository,
  ) {}

  getExpenses() {
    return this.expenseRepo.findAll();
  }

  getExpenseById(id: number) {
    return this.expenseRepo.findById(id);
  }

  createExpense(dto: Expense) {
    return this.expenseRepo.create(dto);
  }

  deleteExpense(id: number) {
    return this.expenseRepo.delete(id);
  }
  
  deleteExpenseFromTo(idFrom: number, idTo: number) {
    return this.expenseRepo.deleteRange(idFrom, idTo);
  }

  createExpenseFromValueArray(dto: string[][]) {
    let created: Promise<Expense>[] = [];
    for (const item of dto) {
      const expense = {
        description: item[0],
        amount: Number(item[1]),
        category: item[2],
        billType: item[3],
        createdAt: item[4].toString(),
        updatedAt: item[4].toString(),
      };

      created.push(this.expenseRepo.create(expense as Expense));
    }

    return Promise.all(created);
  }
}