'use client';

import type { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';
import type { Session } from 'next-auth';
import { NextUIProvider } from '@nextui-org/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

interface ProviderProps {
	children?: ReactNode;
	session: Session | null;
}

const queryClient = new QueryClient();

export const Provider = ({ children, session }: ProviderProps) => {
	return (
		<QueryClientProvider client={queryClient}>
			<SessionProvider session={session}>
				<NextUIProvider>{children}</NextUIProvider>
			</SessionProvider>
		</QueryClientProvider>
	);
};
