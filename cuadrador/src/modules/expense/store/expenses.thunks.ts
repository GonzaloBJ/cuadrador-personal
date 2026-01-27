import { createAsyncThunk } from '@reduxjs/toolkit';
import { createExpense, getExpensesPaginated } from '../services/expenses.service';
import type { Expense } from '../types/expense.type';
import type { PaginatedResult } from '../types/paginated-result.type';

type CreateExpensePayload = {
    description: string;
    amount: number;
    category: string;
    billType: string;
};

type FetchAllExpensesPayload = {
    page: number,
    limit: number,
};

export const fetchExpensesThunk = createAsyncThunk<
    PaginatedResult<Expense>,
    FetchAllExpensesPayload,
    { rejectValue: string }
>(
    'expenses/fetchAll',
    async (payload, { rejectWithValue }) => {
        try {
            return await getExpensesPaginated(payload.page, payload.limit);
        } catch (err: any) {
            return rejectWithValue(err.message ?? 'Error cangando gastos.');
        }
    }
);

export const createExpenseThunk = createAsyncThunk<
    Expense,
    CreateExpensePayload,
    { rejectValue: string }
>(
    'expenses/create',
    async (payload, { rejectWithValue }) => {
        try {
            return await createExpense(payload);
        } catch (err: any) {
            return rejectWithValue(err.message ?? 'Error creando gastos.');
        }
    }
);