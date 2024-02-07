import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import AppRouter from './utils/Router/AppRouter';
import PreciselyContextProvider from './context/PreciselyContext/PreciselyContextProvider';

import './App.css';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <PreciselyContextProvider>
        <AppRouter />
      </PreciselyContextProvider>
    </QueryClientProvider>
  );
};

export default App;
