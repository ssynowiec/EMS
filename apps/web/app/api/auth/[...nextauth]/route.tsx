import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import Github from 'next-auth/providers/github';
import Facebook from 'next-auth/providers/facebook';
import Credentials from 'next-auth/providers/credentials';

export const authOptions = {
	secret: process.env.NEXTAUTH_SECRET as string,
	providers: [
		Google({
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
		}),
		Github({
			clientId: process.env.GITHUB_CLIENT_ID as string,
			clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
		}),
		Facebook({
			clientId: process.env.FACEBOOK_CLIENT_ID as string,
			clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
		}),
		Credentials({
			name: 'Credentials',
			// `credentials` is used to generate a form on the sign in page.
			// You can specify which fields should be submitted, by adding keys to the `credentials` object.
			// e.g. domain, username, password, 2FA token, etc.
			// You can pass any HTML attribute to the <input> tag through the object.
			credentials: {
				username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials, req) {
				// Add logic here to look up the user from the credentials supplied
				const data = {
					username: credentials?.username,
					password: credentials?.password,
				};

				const API_URL = process.env.NEXT_PUBLIC_API_URL;

				const res = await fetch(`${API_URL}/user`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(data),
				});
				const user = await res.json();

				if (!res.ok) {
					throw new Error(user.message);
				}

				if (res.ok && user) {
					return user.user;
				}

				return null;
			},
		}),
	],
	pages: {
		signIn: '/login',
	},
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
