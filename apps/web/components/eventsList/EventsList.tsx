'use client';

import { useSession } from 'next-auth/react';
import { useQuery } from '@tanstack/react-query';
import { env } from '../../env.d.mjs';
import { EventCard } from '@/components/eventCard/EventCard';
import { Spinner } from '@nextui-org/react';

export const EventsList = () => {
	const session = useSession();
	const userId = session?.data?.user?.id;

	const { data: events, isLoading } = useQuery({
		queryKey: ['events'],
		queryFn: async () => {
			const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/event/all`);
			return await res.json();
		},
	});

	console.log(events);

	if (isLoading) return <Spinner />;

	return (
		<ul>
			{events.map((event) => (
				<li key={event.id}>
					<a href={`/${event.slug}`}>
						<EventCard event={event} />
					</a>
				</li>
			))}
		</ul>
	);
};
