import { env } from '../env.d.mjs';

export const getEventBySlug = async (slug: string) => {
	const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/event/${slug}`);
	return await response.json();
};
