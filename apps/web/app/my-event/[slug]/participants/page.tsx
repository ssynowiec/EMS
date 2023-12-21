import { getEventBySlug } from '../../../../utils/getEventBySlug';
import { env } from '../../../../env.d.mjs';

interface EventParticipantsPageProps {
	params: {
		slug: string;
	};
}

const getEventParticipantsByEventId = async (eventId: string) => {
	const res = await fetch(
		`${env.NEXT_PUBLIC_API_URL}/event/${eventId}/participants`,
		{
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
			cache: 'no-cache',
		},
	);

	return await res.json();
};

const EventParticipantsPage = async ({
	params: { slug },
}: EventParticipantsPageProps) => {
	const event = await getEventBySlug(slug);
	const participants = await getEventParticipantsByEventId(event.id);
	console.log(participants);

	return (
		<div>
			<h1>Participants</h1>
		</div>
	);
};

export default EventParticipantsPage;
