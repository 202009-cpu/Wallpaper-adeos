import { AppProvider } from './store/AppContext';
import AppRouter from './navigation/AppRouter';

export default function App() {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
}
