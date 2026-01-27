import { createSlice } from '@reduxjs/toolkit';
import type { Expense } from '../types/expense.type';
import { createExpenseThunk, fetchExpensesThunk } from './expenses.thunks';
import type { PaginatedResult } from '../types/paginated-result.type';

type ExpensesState = {
    items: PaginatedResult<Expense>;
    loading: boolean;
    error: string | null;
};

const initialState: ExpensesState = {
    items: {
        data: [],
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0,
    },
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
            .addCase(fetchExpensesThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchExpensesThunk.fulfilled, (state, action) => {
                state.items = action.payload;
                state.loading = false;
            })
            .addCase(fetchExpensesThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? 'Error inesperado';
            })

            // POST
            .addCase(createExpenseThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createExpenseThunk.fulfilled, (state, action) => {
                state.items.data.unshift(action.payload); 
                state.loading = false;
            })
            .addCase(createExpenseThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? 'Error creando gasto.';
            });
    },
});

export const expensesReducer = expensesSlice.reducer;
