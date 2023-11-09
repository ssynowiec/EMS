import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
	server: {
		DATABASE_URL: z.string(),

		GOOGLE_CLIENT_ID: z.string(),
		GOOGLE_CLIENT_SECRET: z.string(),

		GITHUB_CLIENT_ID: z.string(),
		GITHUB_CLIENT_SECRET: z.string(),

		FACEBOOK_CLIENT_ID: z.string(),
		FACEBOOK_CLIENT_SECRET: z.string(),

		LINKEDIN_CLIENT_ID: z.string(),
		LINKEDIN_CLIENT_SECRET: z.string(),

		NEXTAUTH_SECRET: z.string(),
		NEXTAUTH_URL: z.string(),
	},
	client: {
		NEXT_PUBLIC_API_URL: z.string(),
	},
	runtimeEnv: {
		NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
		DATABASE_URL: process.env.DATABASE_URL,

		GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
		GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,

		GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
		GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,

		FACEBOOK_CLIENT_ID: process.env.FACEBOOK_CLIENT_ID,
		FACEBOOK_CLIENT_SECRET: process.env.FACEBOOK_CLIENT_SECRET,

		LINKEDIN_CLIENT_ID: process.env.LINKEDIN_CLIENT_ID,
		LINKEDIN_CLIENT_SECRET: process.env.LINKEDIN_CLIENT_SECRET,

		NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
		NEXTAUTH_URL: process.env.NEXTAUTH_URL,
	},
	emptyStringAsUndefined: true,
});
