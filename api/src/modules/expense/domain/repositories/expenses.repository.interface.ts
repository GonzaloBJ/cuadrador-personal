import { Expense } from "../models/expense.model";

export interface IExpensesRepository {
  findAll(): Promise<Expense[]>;
  findById(id: number): Promise<Expense | null>;
  create(data: Expense): Promise<Expense>;
  delete(id: number): Promise<void>;
}
