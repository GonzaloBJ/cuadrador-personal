import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../../app/store';
import {
    createExpenseThunk,
    fetchExpensesThunk,
} from '../store/expenses.thunks';

type CreateExpenseInput = {
    description: string;
    amount: number;
    category: string;
    billType: string;
};

export function useExpenses() {
    const dispatch = useDispatch<AppDispatch>();

    const { items, loading, error } = useSelector(
        (state: RootState) => state.expenses
    );

    const fetchExpenses = (params: { page: number; limit: number }) => {
        dispatch(fetchExpensesThunk(params));
    };

    const createExpense = (data: CreateExpenseInput) => {
        dispatch(createExpenseThunk(data));
    };

    return {
        expenses: items,
        loading,
        error,
        createExpense,
        fetchExpenses
    };
}
