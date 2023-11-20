import { Card, CardBody, Image } from '@nextui-org/react';

export const EventCard = ({ event }) => {
	const {
		name,
		thumbnail,
		description,
		startDate,
		startTime,
		endDate,
		endTime,
		eventType,
		onlineLocation,
		offlineLocation,
	} = event;

	const startDateString = new Date(startDate).toLocaleDateString('pl-PL');
	const endDateString = new Date(endDate).toLocaleDateString('pl-PL');

	const location =
		eventType === 'online' ||
		(onlineLocation !== null && offlineLocation === '')
			? 'Online'
			: eventType === 'offline' ||
			    (onlineLocation === null && offlineLocation !== '')
			  ? offlineLocation
			  : `Online & ${offlineLocation}`;

	return (
		<Card className="my-4">
			<CardBody className="flex flex-row">
				<div className="w-1/3 md:mr-4 max-h-full">
					<Image
						src={thumbnail}
						alt={name}
						width={1920}
						height={1080}
						className="max-h-full"
					/>
				</div>
				<div className="w-2/3">
					<h2 className="text-xl font-bold">{name}</h2>
					<p>
						{description && description.length > 255
							? description.substring(0, 255) + '...'
							: description}
					</p>
					<div>
						<p>
							{startDateString === endDateString
								? startDateString
								: `${startDateString} ${startTime} - ${endDateString} ${endTime}`}
						</p>
						{/*<CalendarIconWithDate date={startDate} />*/}
						<p>{location}</p>
					</div>
				</div>
			</CardBody>
		</Card>
	);
};
