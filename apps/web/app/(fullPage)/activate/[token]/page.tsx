import { env } from '../../../../env.d.mjs';
import {
	Button,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Image,
	Link,
} from '@nextui-org/react';

const ValidateToken = async (token: string) => {
	const API_URL = env.NEXT_PUBLIC_API_URL;

	const res = await fetch(`${API_URL}/user/verify/${token}`, {
		cache: 'no-cache',
	});

	return await res.json();
};

const ActivateAccountPage = async ({ params }) => {
	const token = params.token;

	const tokenIsValid = await ValidateToken(token);

	console.log(tokenIsValid);

	if (tokenIsValid.error) {
		return (
			<div>
				<Card>
					<CardHeader>
						<div className="flex justify-center items-center flex-col w-full">
							<Image src="/EMS.png" alt="EMS logo" width="100" height="100" />
							<h1 className="font-bold">Account verification error</h1>
						</div>
					</CardHeader>
					<CardBody>
						<p className="text-red-500">{tokenIsValid.error}</p>
					</CardBody>
					<CardFooter className="flex justify-center items-center">
						<Button className="bg-purple text-white">
							Resend verification link
						</Button>
					</CardFooter>
				</Card>
			</div>
		);
	}

	return (
		<div>
			<Card>
				<CardHeader>
					<div className="flex justify-center items-center flex-col w-full">
						<Image src="/EMS.png" alt="EMS logo" width="100" height="100" />
						<h1 className="font-bold">Your account was activated</h1>
					</div>
				</CardHeader>
				<CardBody>{tokenIsValid.message}</CardBody>
				<CardFooter className="flex justify-center items-center">
					<Button as={Link} href="/login" className="bg-purple text-white">
						Log in to your account
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
};

export default ActivateAccountPage;
