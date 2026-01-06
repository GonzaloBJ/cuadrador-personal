import type { Expense } from '../types/expense.type';

type Props = {
  expenses: Expense[];
};

export function ExpensesTable({ expenses }: Props) {
  return (
    <>
      <h2>Gastos</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Descripción</th>
            <th>Monto</th>
            <th>Categoría</th>
            <th>Tipo Gasto</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map(u => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.description}</td>
              <td>{u.amount}</td>
              <td>{u.category}</td>
              <td>{u.billType}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
