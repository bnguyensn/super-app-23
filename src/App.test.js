import { render, screen } from '@testing-library/react';
import App from './App';

import { apolloClient } from './apolloClient';
import { ApolloProvider } from '@apollo/client';
import { QueryClient, QueryClientProvider } from 'react-query';

describe('app test', () => {
  const queryClient = new QueryClient();

  it('renders the app correctly', () => {
    render(
      <ApolloProvider client={apolloClient}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </ApolloProvider>
    );

    expect(screen.getByRole('main')).toBeInTheDocument();
  });
});
