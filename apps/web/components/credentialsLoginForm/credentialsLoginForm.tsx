'use client';

import { Button, Input, Link } from '@nextui-org/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { EyeFilledIcon, EyeSlashFilledIcon } from 'ui';
import { useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';

type Inputs = {
	username: string;
	password: string;
};

export const CredentialsLoginForm = () => {
	const searchParams = useSearchParams();
	const callbackUrl = searchParams.get('callbackUrl') || '/profile';

	const [isVisible, setIsVisible] = useState(false);

	const toggleVisibility = () => setIsVisible((prevState) => !prevState);

	const router = useRouter();

	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm<Inputs>();

	const onSubmit = async (data: Inputs) => {
		const res = await signIn('credentials', {
			username: data.username,
			password: data.password,
			callbackUrl,
			redirect: false,
		});

		if (res?.error) {
			setError('username', {
				type: 'manual',
				message: res.error,
			});
			setError('password', {
				type: 'manual',
				message: res.error,
			});
		}

		if (res?.url) router.push(res.url);
		// setSubmitting(false);
	};

	return (
		<>
			<form
				method="POST"
				className="flex flex-col w-full flex-wrap md:flex-nowrap gap-4"
				onSubmit={handleSubmit(onSubmit)}
			>
				<Input
					type="email"
					label="Email"
					placeholder="jan.kowalski@gmail.com"
					isRequired={true}
					size="md"
					validationState={errors.username ? 'invalid' : 'valid'}
					errorMessage={errors.username?.message}
					{...register('username', { required: true })}
				/>
				<Input
					label="Password"
					size="md"
					isRequired={true}
					placeholder="**********"
					validationState={errors.password ? 'invalid' : 'valid'}
					errorMessage={errors.password?.message}
					{...register('password', { required: true })}
					endContent={
						<button
							className="focus:outline-none"
							type="button"
							onClick={toggleVisibility}
						>
							{isVisible ? (
								<EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
							) : (
								<EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
							)}
						</button>
					}
					type={isVisible ? 'text' : 'password'}
					className="w-full"
				/>
				<Button
					type="submit"
					color="primary"
					size="md"
					className="w-full bg-purple"
				>
					Log in
				</Button>
				<div className="flex flex-col md:flex-row justify-between items-center">
					<Link
						href="/register"
						title="Create your account"
						className="text-purple"
					>
						Create your account
					</Link>
					<Link href="/reset-password" className="text-purple">
						Reset password
					</Link>
				</div>
			</form>
		</>
	);
};
