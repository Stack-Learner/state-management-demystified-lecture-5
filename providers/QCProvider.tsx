'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FC } from 'react';

const queryClient = new QueryClient();

type QCProviderProps = {
	children: React.ReactNode;
};

export const QCProvider: FC<QCProviderProps> = ({ children }) => {
	return (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	);
};
