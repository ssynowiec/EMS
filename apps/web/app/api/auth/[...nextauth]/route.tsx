import NextAuth, { type NextAuthOptions } from 'next-auth';
import Google from 'next-auth/providers/google';
import Github from 'next-auth/providers/github';
import Facebook from 'next-auth/providers/facebook';
import Credentials from 'next-auth/providers/credentials';
import { PrismaClient } from '@prisma/client';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { env } from '../../../../env.d.mjs';

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
	adapter: PrismaAdapter(prisma),
	secret: env.NEXTAUTH_SECRET as string,
	session: {
		strategy: 'jwt',
	},
	providers: [
		Google({
			clientId: env.GOOGLE_CLIENT_ID as string,
			clientSecret: env.GOOGLE_CLIENT_SECRET as string,
		}),
		// LinkedIn({
		// 	clientId: env.LINKEDIN_CLIENT_ID as string,
		// 	clientSecret: env.LINKEDIN_CLIENT_SECRET as string,
		// 	wellKnown:
		// 		'https://www.linkedin.com/oauth/.well-known/openid-configuration',
		// 	authorization: {
		// 		params: {
		// 			scope: 'openid profile email',
		// 		},
		// 	},
		// }),
		Github({
			clientId: env.GITHUB_CLIENT_ID as string,
			clientSecret: env.GITHUB_CLIENT_SECRET as string,
		}),
		Facebook({
			clientId: env.FACEBOOK_CLIENT_ID as string,
			clientSecret: env.FACEBOOK_CLIENT_SECRET as string,
		}),
		Credentials({
			name: 'Credentials',
			credentials: {
				email: {
					label: 'Email',
					type: 'email',
					placeholder: 'john@example.com',
				},
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials) {
				const data = {
					email: credentials?.email,
					password: credentials?.password,
				};

				const API_URL = env.NEXT_PUBLIC_API_URL;

				const res = await fetch(`${API_URL}/user`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(data),
				});
				const user = await res.json();

				console.log(user);

				if (!res.ok) {
					throw new Error(user.message);
				}

				if (res.ok && user) {
					return user;
				}

				return null;
			},
		}),
	],
	callbacks: {
		jwt({ token, user }) {
			if (user) token.role = user.role;
			return token;
		},
		session({ session, token }) {
			session.user.role = token.role;
			return session;
		},
	},
	pages: {
		signIn: '/login',
	},
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
