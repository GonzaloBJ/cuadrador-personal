import { useSelector } from 'react-redux';
import type { RootState } from './app/store';

export function TestRedux() {
  const state = useSelector((state: RootState) => state.expenses);
  return <pre>{JSON.stringify(state, null, 2)}</pre>;
}