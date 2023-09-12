'use client';

import type { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';
import type { Session } from 'next-auth';
import { NextUIProvider } from '@nextui-org/react';

interface ProviderProps {
	children?: ReactNode;
	session: Session | null;
}

export const Provider = ({ children, session }: ProviderProps) => {
	return (
		<SessionProvider session={session}>
			<NextUIProvider>{children}</NextUIProvider>
		</SessionProvider>
	);
};
