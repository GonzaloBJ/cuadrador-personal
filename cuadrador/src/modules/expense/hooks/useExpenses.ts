import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../../app/store';
import {
    fetchExpenses,
    createExpenseThunk,
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

    useEffect(() => {
        dispatch(fetchExpenses());
    }, [dispatch]);

    const createExpense = (data: CreateExpenseInput) => {
        dispatch(createExpenseThunk(data));
    };

    return {
        expenses: items,
        loading,
        error,
        createExpense,
    };
}
