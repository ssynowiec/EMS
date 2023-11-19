import { Card, CardBody, Image } from '@nextui-org/react';

export const EventCard = ({ event }) => {
	const { name, slug, thumbnail, description, date, location } = event;

	return (
		<li>
			<a href={`/${slug}`}>
				<Card>
					<CardBody className="flex flex-row">
						<Image src={thumbnail} alt={name} className="w-1/3" />
						<div className="w-2/3">
							<h2>{name}</h2>
							<p>{description}</p>
						</div>
					</CardBody>
				</Card>
			</a>
		</li>
	);
};
