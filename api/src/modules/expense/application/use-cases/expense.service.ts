import { Inject, Injectable } from '@nestjs/common';
import * as expensesRepositoryInterface from '../../domain/repositories/expenses.repository.interface';
import { Expense } from '../../domain/models/expense.model';


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
}