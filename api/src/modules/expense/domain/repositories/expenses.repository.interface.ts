import { PaginatedResult } from "src/core/DTOs/paginated-result.dto";
import { Expense } from "../models/expense.model";

export interface IExpensesRepository {
  findAll(): Promise<Expense[]>;
  findById(id: number): Promise<Expense | null>;
  findAllPaginated(page: number, limit: number): Promise<PaginatedResult<Expense>>;
  create(data: Expense): Promise<Expense>;
  delete(id: number): Promise<{ deletedId: number }[]>;
  deleteRange(idFrom: number, idTo: number): Promise<{ deletedId: number }[]>
}
