import { useExpenses } from '../hooks/useExpenses';
import { ExpensesTable } from '../components/ExpensesTable';
import { ExpenseForm } from '../components/ExpenseForm';
import { useEffect } from 'react';
import { fetchExpenses } from '../store/expenses.thunks';

export function ExpensesPage() {
  const { expenses, loading, error, createExpense } = useExpenses();

  useEffect(() => {
    fetchExpenses();
  }, []);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <ExpenseForm onSubmit={createExpense} />
      <ExpensesTable expenses={expenses} />
    </>
  );
}

