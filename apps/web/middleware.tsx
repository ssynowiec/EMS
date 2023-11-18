import { withAuth } from 'next-auth/middleware';

// More on how NextAuth.js middleware works: https://next-auth.js.org/configuration/nextjs#middleware

const adminPages = ['/admin', '/users'];

export default withAuth({
	pages: {
		signIn: '/login',
	},
	callbacks: {
		authorized({ req, token }) {
			// `/admin` requires admin role

			if (adminPages.includes(req.nextUrl.pathname)) {
				return token?.role === 'ADMIN';
			}

			// `/me` only requires the user to be logged in
			return !!token;
		},
	},
});

export const config = {
	matcher: ['/admin', '/dashboard', '/my-account', '/users', '/add-event'],
};
