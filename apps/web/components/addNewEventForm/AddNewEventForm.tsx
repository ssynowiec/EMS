import { Step1 } from '@/components/addNewEventForm/step1/Step1';
import { Step2 } from '@/components/addNewEventForm/step2/Step2';
import { useFormContext } from 'react-hook-form';
import { env } from '../../env.d.mjs';
import { EventCard } from '@/components/eventCard/EventCard';
import { useState } from 'react';

interface AddNewEventFormProps {
	step: number;
}

type Inputs = {
	eventName: string;
	eventUrl: string;
	eventDescription?: string;
	eventThumbnail?: File;
	eventStartDate?: Date;
	eventStartTime?: string;
	eventEndDate?: Date;
	eventEndTime?: string;
	eventOnlineLocation?: string;
	eventLocation?: string;
	organizer: string;
};

const onSubmit = async (data: Inputs) => {
	if (data.eventThumbnail) {
		const formData = new FormData();

		formData.append('file', data.eventThumbnail);
		formData.append('upload_preset', 'thumbnail');
		formData.append('public_id', data.eventUrl);

		// commented to save credits

		// const image = await fetch(
		// 	`https://api.cloudinary.com/v1_1/${env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
		// 	{
		// 		method: 'POST',
		// 		body: formData,
		// 	},
		// );
		//
		// const imgJson = await image.json();

		// const thumbnailUrl = imgJson.secure_url;
	}

	console.log(data);
	const thumbnailUrl =
		'https://res.cloudinary.com/stasyn-ems/image/upload/v1700053031/event-thumb/aaa.png';

	const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/event/create`, {
		method: 'POST',
		body: JSON.stringify({
			name: data.eventName,
			slug: data.eventUrl,
			thumbnail: thumbnailUrl,
			startDate: data.eventStartDate,
			endDate:
				data.eventEndDate === undefined
					? data.eventStartDate
					: data.eventEndDate,
			startTime: data.eventStartTime,
			endTime: data.eventEndTime,
			onlineLocation: data.eventOnlineLocation,
			offlineLocation: data.eventLocation,
			organizer: data.organizer,
		}),
		headers: {
			'Content-Type': 'application/json',
		},
	});

	const json = await res.json();

	console.log(json);
};

export const AddNewEventForm = ({ step }: AddNewEventFormProps) => {
	const { handleSubmit, watch } = useFormContext();
	const [eventThumbnail, setEventThumbnail] = useState<
		string | ArrayBuffer | null
	>('');

	const event = {
		name: watch('eventName') || 'My event name',
		slug: watch('eventUrl') || '',
		thumbnail: eventThumbnail || '/thumb-placeholder.png',
		description:
			watch('eventDescription') ||
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ac ligula in velit congue interdum eu nec turpis. Maecenas consequa pretium sem nec ultrices. Integer vel vulputate purus, ornare consequat dui. Cras laoreet sollicitudin mauris sed dictum. Sed in nisi id quam dapibus mattis vel at metus. Nam porttitor sapien augue, ut lacinia lacus sagittis sit amet. Vivamus mollis, ligula sed luctus molestie, urna odio hendrerit urna, sit amet egestas orci metus sed sem. Vestibulum cursus consequat leo, aliquam fermentum arcu fringilla non. Quisque ac tincidunt justo. Pellentesque tincidunt dui ipsum, vitae finibus purus varius at. Nulla dapibus fringilla risus, in sagittis justo semper nec. Etiam at rutrum est. Donec efficitur varius orci, quis bibendum felis tincidunt ut. Duis eget tempor justo. Phasellus eu imperdiet ex, at tempor nibh.',
		startDate: watch('eventStartDate') || new Date(),
		startTime: watch('eventStartTime') || '',
		endDate: watch('eventEndDate') || new Date(),
		endTime: watch('eventEndTime') || '',
		eventType: watch('eventType') || 'hybrid',
		onlineLocation: watch('eventOnlineLocation') || '',
		offlineLocation: watch('eventLocation') || '',
	};

	return (
		<>
			<form
				method="POST"
				onSubmit={handleSubmit(onSubmit)}
				encType="multipart/form-data"
			>
				{(() => {
					switch (step) {
						case 1:
							return (
								<Step1
									eventThumbnail={eventThumbnail}
									setEventThumbnail={setEventThumbnail}
								/>
							);
						case 2:
							return <Step2 />;
					}
				})()}
			</form>
			<p className="font-bold">Your event preview:</p>
			<EventCard event={event} />
		</>
	);
};
