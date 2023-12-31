'use client';

import {
	Button,
	Card,
	CardBody,
	Chip,
	Image,
	Input,
	Link,
} from '@nextui-org/react';
import { signIn } from 'next-auth/react';
import { FacebookIcon, GithubIcon, GoogleIcon } from 'ui';
import { LinkedinIcon } from 'ui/components/icons/linkedinIcon/LinkedinIcon';
import type { ReactElement } from 'react';

type AccountProvider = {
	name: string;
	icon: ReactElement;
	isAvailable: boolean;
	onLink: () => void;
	onUnlink: () => void;
};

const accountProviders: AccountProvider[] = [
	{
		name: 'Google',
		icon: <GoogleIcon />,
		isAvailable: true,
		onLink: async () => await signIn('google', { callbackUrl: '/my-account' }),
		onUnlink: () => {},
	},
	{
		name: 'Facebook',
		icon: <FacebookIcon />,
		isAvailable: true,
		onLink: async () =>
			await signIn('facebook', { callbackUrl: '/my-account' }),
		onUnlink: () => {},
	},
	{
		name: 'Github',
		icon: <GithubIcon />,
		isAvailable: true,
		onLink: async () => await signIn('github', { callbackUrl: '/my-account' }),
		onUnlink: () => {},
	},
	{
		name: 'Linkedin',
		icon: <LinkedinIcon />,
		isAvailable: false,
		onLink: async () =>
			await signIn('linkedin', { callbackUrl: '/my-account' }),
		onUnlink: () => {},
	},
];

export const UserAccount = ({ user }) => {
	return (
		<>
			<Card>
				<CardBody>
					<form className="flex flex-col gap-3">
						<Image
							src={user.image || '/images/avatar.png'}
							alt={`${user.name} avatar`}
							width={100}
							height={100}
						/>
						<Input label="Name" defaultValue={user.name || ''} />
						<div className="flex">
							<Input
								label="Email"
								defaultValue={user.email || ''}
								isDisabled={true}
							/>
							<Link className="cursor-pointer">Change email</Link>
						</div>
						<Button className="bg-purple text-white">Save</Button>
					</form>
				</CardBody>
			</Card>
			<h2>Linked accounts</h2>
			<div className="flex flex-col gap-3">
				{accountProviders.map((provider, index) => {
					const isConnected = user.accounts?.some(
						(accountProvider: { provider: string }) =>
							accountProvider.provider === provider.name.toLowerCase(),
					);

					return (
						<Card key={index}>
							<CardBody>
								<div className="flex justify-between items-center">
									<div className="flex gap-2">
										{provider.icon}
										<h3>{provider.name}</h3>
										{!provider.isAvailable && <Chip>soon...</Chip>}
									</div>
									{isConnected && provider.isAvailable ? (
										<Button
											color="success"
											className="text-white"
											onClick={provider.onUnlink}
										>
											Connected
											{/*<br />*/}
											{/*<span className="text-xs">(unlink)</span>*/}
										</Button>
									) : (
										<Button
											isDisabled={!provider.isAvailable}
											onClick={provider.onLink}
										>
											Connect with {provider.name}
										</Button>
									)}
								</div>
							</CardBody>
						</Card>
					);
				})}
			</div>
		</>
	);
};
