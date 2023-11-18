'use client';

import {
	Button,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Divider,
	Image,
	Link,
} from '@nextui-org/react';
import { useState } from 'react';
import { AddNewEventForm } from '@/components/addNewEventForm/AddNewEventForm';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

// const validationSchema = [
// 	yup.object({
// 		eventName: yup.string().required('Event name is required'),
// 		eventUrl: yup.string().required('Event URL is required'),
// 		eventThumbnail: yup.mixed(),
// 		eventDescription: yup.string(),
// 	}),
// 	yup.object({
// 		eventOnlineLocation: yup.string(),
// 		eventLocation: yup.string(),
// 		eventStartDate: yup.date(),
// 		eventStartTime: yup.string(),
// 		eventEndDate: yup.date(),
// 		eventEndTime: yup.string(),
// 	}),
// ];

const validationStep1 = yup.object({
	eventName: yup.string().required('Event name is required'),
	eventUrl: yup.string().required('Event URL is required'),
	eventThumbnail: yup.mixed(),
	eventDescription: yup.string(),
});

const validationStep2 = yup.object({
	eventOnlineLocation: yup.string(),
	eventLocation: yup.string(),
	eventStartDate: yup.date(),
	eventStartTime: yup.string(),
	eventEndDate: yup.date(),
	eventEndTime: yup.string(),
});

const validationSchema = [validationStep1, validationStep2];

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

const AddNewEventPage = () => {
	const lastStep = 2;
	const [step, setStep] = useState(1);

	const currentSchema = validationSchema[step - 1];

	const methods = useForm<Inputs>({
		resolver: yupResolver(currentSchema),
	});

	const { trigger, getValues } = methods;

	const nextStep = async () => {
		const isStepValid = await trigger();
		const values = getValues();
		console.log(values);
		if (isStepValid) {
			setStep((prevState) => prevState + 1);
		}
	};

	return (
		<FormProvider {...methods}>
			<Card className="w-full h-screen rounded-none">
				<CardHeader className="flex w-full">
					<div className="flex justify-center items-center">
						<Link href="/dashboard">
							<Image src="/EMS.png" width="50" height="50" alt="EMS logo" />
						</Link>
						<h1>Add New Event</h1>
					</div>
				</CardHeader>
				<Divider />
				<CardBody>
					<AddNewEventForm step={step} />
				</CardBody>
				<CardFooter className="flex justify-end">
					{step === 1 && (
						<Button as={Link} className="mr-2" href="/dashboard">
							Cancel
						</Button>
					)}
					{step !== 1 && (
						<Button
							className="mr-2"
							onClick={() => setStep((prevState) => prevState - 1)}
						>
							Back
						</Button>
					)}

					{step !== lastStep && (
						<Button className="bg-purple text-white" onClick={() => nextStep()}>
							Next
						</Button>
					)}
				</CardFooter>
			</Card>
		</FormProvider>
	);
};

export default AddNewEventPage;
