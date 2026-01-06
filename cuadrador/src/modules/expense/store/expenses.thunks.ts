import { createAsyncThunk } from '@reduxjs/toolkit';
import { createExpense, getExpenses } from '../services/expenses.service';
import type { Expense } from '../types/expense.type';

type CreateExpensePayload = {
    description: string;
    amount: number;
    category: string;
    billType: string;
};

export const fetchExpenses = createAsyncThunk<
    Expense[],
    void,
    { rejectValue: string }
>(
    'expenses/fetchAll',
    async (_, { rejectWithValue }) => {
        try {
            return await getExpenses();
        } catch (err: any) {
            return rejectWithValue(err.message ?? 'Error loading expenses');
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
            return rejectWithValue(err.message ?? 'Error creating expense');
        }
    }
);