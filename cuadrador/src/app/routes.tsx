import { useRoutes } from 'react-router-dom';
import { ExpensesPage } from '../modules/expense/pages/ExpensesPage';
import { MainLayout } from './layouts/MainLayout';

export function AppRoutes() {
    return useRoutes([
        {
            element: <MainLayout />,
            children: [
                { path: '/', element: <ExpensesPage /> },
                { path: '/expenses', element: <ExpensesPage /> },
                // { path: '/expenses/new', element: <CreateExpensePage /> },
            ],
        },
    ]);
}