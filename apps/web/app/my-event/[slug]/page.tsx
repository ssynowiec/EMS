import { getEventBySlug } from '../../../utils/getEventBySlug';
import { Card, CardBody, Link } from '@nextui-org/react';
import clsx from 'clsx';
import { CardWithProgressCircle } from '@/components/cardWithProgressCircle/CardWithProgressCircle';

interface EventOrganizerPageProps {
	params: {
		slug: string;
	};
}

const EventOrganizerPage = async ({
	params: { slug },
}: EventOrganizerPageProps) => {
	const event = await getEventBySlug(slug);

	return (
		<section className="py-4 flex flex-col gap-4">
			<h1 className="font-bold text-2xl">{event.name}</h1>
			<div className="flex flex-col md:flex-row gap-4">
				<Card
					className={clsx(
						{
							'bg-gray-300': event.status === 'DRAFT',
							'bg-green-500 text-white': event.status === 'PUBLISHED',
						},
						'w-full md:w-1/4',
					)}
					shadow="md"
				>
					<CardBody className="flex flex-row justify-around items-center">
						<div className="w-1/2">
							<p>STATUS:</p>
							<p className="font-bold">{event.status}</p>
						</div>
						<div className="w-1/2 flex items-center justify-center">a</div>
					</CardBody>
				</Card>

				<Link
					href={`/my-event/${event.slug}/participants`}
					className="md:w-1/4"
				>
					<CardWithProgressCircle
						value={event._count.Attendees}
						maxValue={event.maxAttendees}
						title="Registered users"
					/>
				</Link>

				<Card
					className={clsx(
						{
							'bg-gray-300': event.status === 'DRAFT',
							'bg-green-500 text-white': event.status === 'PUBLISHED',
						},
						'w-full md:w-1/4 font-bold',
					)}
					shadow="md"
				>
					<CardBody className="flex flex-row justify-between items-center">
						<div className="w-1/2">
							<p>STATUS:</p>
							<p>{event.status}</p>
						</div>
						<div className="w-1/2 flex items-center justify-center">a</div>
					</CardBody>
				</Card>
				<Card
					className={clsx(
						{
							'bg-gray-300': event.status === 'DRAFT',
							'bg-green-500 text-white': event.status === 'PUBLISHED',
						},
						'w-full md:w-1/4 font-bold',
					)}
					shadow="md"
				>
					<CardBody className="flex flex-row justify-between items-center">
						<div className="w-1/2">
							<p>STATUS:</p>
							<p>{event.status}</p>
						</div>
						<div className="w-1/2 flex items-center justify-center">a</div>
					</CardBody>
				</Card>
			</div>
		</section>
	);
};

export default EventOrganizerPage;
