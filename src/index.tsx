import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme';
import { RouterProvider } from 'react-router-dom';
import router from './Router';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLDivElement);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

