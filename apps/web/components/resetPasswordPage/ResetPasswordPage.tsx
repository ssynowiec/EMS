'use client';

import { Card, Image, Link } from '@nextui-org/react';
import { ResetPasswordForm } from '../resetPasswordForm/ResetPasswordForm';

export const ResetPassword = () => {
	return (
		<Card className="flex w-11/12 lg:w-1/3 md:w-2/3 max-w-2xl flex-col px-4 sm:px-6 justify-center items-center">
			<div className="relative flex flex-col items-center">
				<Link href="/" title="Back to home page">
					<Image src="./EMS.png" alt="EMS logo" width="150" height="150" />
				</Link>
				<h1 className="text-center text-2xl font-medium tracking-tight text-gray-900 pb-4">
					Reset your password
				</h1>
			</div>
			<div className="sm:rounded-5xl -mx-4 flex-auto px-4 sm:mx-0 sm:flex-none p-8 w-11/12 md:w-2/3 lg:w-10/12">
				<ResetPasswordForm />
			</div>
		</Card>
	);
};
