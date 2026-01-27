import { useExpenses } from '../hooks/useExpenses';
import { ExpensesTable } from '../components/ExpensesTable';
import { ExpenseForm } from '../components/ExpenseForm';
import { useEffect, useState } from 'react';
import { ExpensesPagination } from '../components/ExpensesPagination';

export function ExpensesPage() {
  const [page, setPage] = useState(1);
  const limit = 10;
  const { expenses, loading, error, createExpense, fetchExpenses } = useExpenses();

  useEffect(() => {
    fetchExpenses({ page, limit });
  }, [page, limit]);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <ExpenseForm onSubmit={createExpense} />
      <ExpensesTable expenses={expenses} />
      <ExpensesPagination page={page} setPage={setPage} />
    </>
  );
}

