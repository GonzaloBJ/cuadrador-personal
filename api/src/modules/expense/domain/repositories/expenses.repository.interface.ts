import { Expense } from "../models/expense.model";

export interface IExpensesRepository {
  findAll(): Promise<Expense[]>;
  findById(id: number): Promise<Expense | null>;
  create(data: Expense): Promise<Expense>;
  delete(id: number): Promise<{ deletedId: number }[]>;
  deleteRange(idFrom: number, idTo: number): Promise<{ deletedId: number }[]>
}
