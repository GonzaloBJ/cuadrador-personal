import { httpClient } from '../../../shared/services/httpClient';
import type { Expense } from '../types/expense.type';
import type { PaginatedResult } from '../types/paginated-result.type';

type CreateExpenseDto = Omit<
    Expense,
    'id' | 'createdAt' | 'updatedAt'
>;

export async function getExpenses(): Promise<Expense[]> {
    const response = await httpClient.get<Expense[]>('/expenses');
    return response.data;
}

export async function getExpenseById(id: number): Promise<Expense> {
    const response = await httpClient.get<Expense>(`/expenses/${id}`);
    return response.data;
}

export async function getExpensesPaginated(page: number, limit: number): Promise<PaginatedResult<Expense>> {
    const response = await httpClient.get<PaginatedResult<Expense>>(`/expenses/paginated/${page}/${limit}`);
    return response.data;
}

export async function createExpense(
    payload: CreateExpenseDto
): Promise<Expense> {
    const response = await httpClient.post<Expense>('/expenses', payload);
    return response.data;
}