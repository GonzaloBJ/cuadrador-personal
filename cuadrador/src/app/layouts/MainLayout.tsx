import { Outlet, NavLink } from 'react-router-dom';

export function MainLayout() {
    return (
        <div>
            <header>
                <nav>
                    <NavLink to="/expenses">Expenses</NavLink>
                    {' | '}
                    {/* <NavLink to="/expenses/new">New Expense</NavLink> */}
                </nav>
            </header>

            <main>
                <Outlet />
            </main>
        </div>
    );
}
