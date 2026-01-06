import { createSlice } from '@reduxjs/toolkit';
import type { Expense } from '../types/expense.type';
import { createExpenseThunk, fetchExpenses } from './expenses.thunks';

type ExpensesState = {
    items: Expense[];
    loading: boolean;
    error: string | null;
};

const initialState: ExpensesState = {
    items: [],
    loading: false,
    error: null,
};

const expensesSlice = createSlice({
    name: 'expenses',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // GET
            .addCase(fetchExpenses.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchExpenses.fulfilled, (state, action) => {
                state.items = action.payload;
                state.loading = false;
            })
            .addCase(fetchExpenses.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? 'Unexpected error';
            })

            // POST
            .addCase(createExpenseThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createExpenseThunk.fulfilled, (state, action) => {
                state.items.unshift(action.payload); // lo agregamos al inicio
                state.loading = false;
            })
            .addCase(createExpenseThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? 'Error creating expense';
            });
    },
});

export const expensesReducer = expensesSlice.reducer;
