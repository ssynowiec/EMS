// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth, { type DefaultSession, type DefaultUser } from 'next-auth';

declare module 'next-auth' {
	interface Session extends DefaultSession {
		user: {
			role: string | unknown;
		};
	}

	interface User extends DefaultUser {
		role: string;
	}
}
