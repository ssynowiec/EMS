import { Step1 } from '@/components/addNewEventForm/step1/Step1';
import { Step2 } from '@/components/addNewEventForm/step2/Step2';
import { useFormContext } from 'react-hook-form';

interface AddNewEventFormProps {
	step: number;
}

type Inputs = {
	eventName: string;
	eventUrl: string;
	eventThumbnail?: File;
	eventDescription?: string;
	eventOnlineLocation?: string;
	eventLocation?: string;
	eventStartDate?: Date;
	eventStartTime?: string;
	eventEndDate?: Date;
	eventEndTime?: string;
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
		const thumbnailUrl =
			'https://res.cloudinary.com/stasyn-ems/image/upload/v1700053031/event-thumb/aaa.png';
		console.log(data);
	}

	// const event = await fetch(`${env.NEXT_PUBLIC_API_URL}/events/create`, {
	// 	method: 'POST',
	// 	body: JSON.stringify({
	// 		name: data.eventName,
	// 		slug: data.eventUrl,
	// 		thumbnail: data.eventThumbnail,
	// 		description: data.eventDescription,
	// 	}),
	// 	headers: {
	// 		'Content-Type': 'application/json',
	// 	},
	// });
	console.log('event');
};

export const AddNewEventForm = ({ step }: AddNewEventFormProps) => {
	const { handleSubmit } = useFormContext();

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
							return <Step1 />;
						case 2:
							return <Step2 />;
					}
				})()}
			</form>
		</>
	);
};
