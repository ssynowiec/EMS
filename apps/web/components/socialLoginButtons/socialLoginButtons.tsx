'use client';

import { Button } from '@nextui-org/react';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { FacebookIcon, GithubIcon, GoogleIcon } from 'ui';

export const SocialLoginButtons = () => {
	const searchParams = useSearchParams();
	const callbackUrl = searchParams.get('callbackUrl') || '/profile';

	return (
		<div className="flex flex-col w-full flex-wrap md:flex-nowrap gap-4">
			<Button
				startContent={<GoogleIcon />}
				className="w-full"
				onClick={() => signIn('google', { callbackUrl })}
			>
				Continue with Google
			</Button>
			{/*<Button*/}
			{/*	startContent={<LinkedinIcon />}*/}
			{/*	className="w-full"*/}
			{/*	onClick={() => signIn('linkedin', { callbackUrl })}*/}
			{/*>*/}
			{/*	Continue with LinkedIn*/}
			{/*</Button>*/}
			<Button
				startContent={<GithubIcon />}
				className="w-full"
				onClick={() => signIn('github', { callbackUrl })}
			>
				Continue with Github
			</Button>
			<Button
				startContent={<FacebookIcon />}
				className="w-full"
				onClick={() => signIn('facebook', { callbackUrl })}
			>
				Continue with Facebook
			</Button>
		</div>
	);
};
