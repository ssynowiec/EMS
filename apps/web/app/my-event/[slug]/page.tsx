import { getEventBySlug } from '../../../utils/getEventBySlug';

interface EventOrganizerPageProps {
	params: {
		slug: string;
	};
}

const EventOrganizerPage = async ({
	params: { slug },
}: EventOrganizerPageProps) => {
	const event = await getEventBySlug(slug);

	return <div>{event.name}</div>;
};

export default EventOrganizerPage;
