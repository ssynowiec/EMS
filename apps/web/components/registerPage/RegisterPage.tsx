'use client';

import { SocialLoginButtons } from '../socialLoginButtons/socialLoginButtons';
import { Card, Image, Link } from '@nextui-org/react';
import { useSearchParams } from 'next/navigation';
import { RegisterForm } from '../registerForm/RegisterForm';

const errors = {
	Signin: 'Try signing with a different account.',
	OAuthSignin: 'Try signing with a different account.',
	OAuthCallback: 'Try signing with a different account.',
	OAuthCreateAccount: 'Try signing with a different account.',
	EmailCreateAccount: 'Try signing with a different account.',
	Callback: 'Try signing with a different account.',
	OAuthAccountNotLinked:
		'To confirm your identity, sign in with the same account you used originally.',
	EmailSignin: 'Check your email address.',
	CredentialsSignin:
		'Sign in failed. Check the details you provided are correct.',
	default: 'Unable to sign in.',
};

export const RegisterPage = () => {
	const searchParams = useSearchParams();
	const error = searchParams.get('error') || '';

	return (
		<Card className="flex w-11/12 lg:w-1/3 md:w-2/3 max-w-2xl flex-col px-4 sm:px-6 justify-center items-center">
			<div className="relative flex flex-col items-center">
				<Link href="/" title="Back to home page">
					<Image src="./EMS.png" alt="EMS logo" width="150" height="150" />
				</Link>
				<h1 className="text-center text-2xl font-medium tracking-tight text-gray-900 pb-4">
					Create your account
				</h1>
				{error && (
					<p className="w-96 break-words text-red-500 text-center">
						{errors[error]}
					</p>
				)}
			</div>
			<div className="sm:rounded-5xl -mx-4 flex-auto px-4 sm:mx-0 sm:flex-none p-8 w-11/12 md:w-2/3 lg:w-10/12">
				<RegisterForm />
				<div className="mx-auto my-6 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">
					or
				</div>
				<SocialLoginButtons />
			</div>
		</Card>
	);
};
