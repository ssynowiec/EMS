'use client';

import {
	Button,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Divider,
	Image,
	Input,
	Link,
	Textarea,
} from '@nextui-org/react';
import { useState } from 'react';

const AddNewEventPage = () => {
	const [step, setStep] = useState(1);

	return (
		<Card className="w-full h-screen">
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
				<form>
					<Input
						label="Event name"
						labelPlacement="outside"
						placeholder="Event test"
						required={true}
					/>
					<Input
						label="Event name"
						labelPlacement="outside"
						placeholder="event-test"
						type="url"
						startContent={
							<div className="pointer-events-none flex items-center">
								<span className="text-default-400 text-small">
									https://ems.pl/
								</span>
							</div>
						}
						required={true}
					/>
					<Input
						type="image"
						label="Event thumbnail"
						labelPlacement="outside"
						placeholder="Event thumbnail"
					/>
					<Textarea
						label="Event description"
						labelPlacement="outside"
						placeholder="My event is the best event in the world!"
					/>
				</form>
			</CardBody>
			<CardFooter className="flex justify-end">
				<Button as={Link} href="/dashboard">
					Cancel
				</Button>
				<Button
					className="bg-purple text-white"
					onClick={() => setStep((prevState) => prevState + 1)}
				>
					Next
				</Button>
			</CardFooter>
		</Card>
	);
};

export default AddNewEventPage;
