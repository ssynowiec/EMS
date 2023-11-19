// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { type DefaultSession, type DefaultUser } from 'next-auth';

declare module 'next-auth' {
	interface Session extends DefaultSession {
		user: {
			id: string | unknown;
			role: string | unknown;
		} & DefaultSession['user'];
	}

	interface User extends DefaultUser {
		id: string;
		role: string;
		status: string;
	}
}
