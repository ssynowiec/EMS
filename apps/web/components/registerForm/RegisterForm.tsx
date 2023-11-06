'use client';

import { Button, Checkbox, Input } from '@nextui-org/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { EyeFilledIcon, EyeSlashFilledIcon } from 'ui';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

type Inputs = {
	name: string;
	email: string;
	password: string;
	repeatPassword: string;
	termsAndConditions: boolean;
};

const validationSchema = yup.object({
	name: yup.string().required('Name is required'),
	email: yup
		.string()
		.email('Invalid email format')
		.required('Email is required'),
	password: yup
		.string()
		.min(8, 'Password must be at least 8 characters')
		.required('Password is required'),
	repeatPassword: yup
		.string()
		.required()
		.oneOf([yup.ref('password'), 'Passwords must match']),
	termsAndConditions: yup
		.boolean()
		.required('Accept Terms & Conditions is required')
		.oneOf([true], 'Accept Terms & Conditions is required'),
});

const API_URL = process.env['NEXT_PUBLIC_API_URL'];

export const RegisterForm = () => {
	const searchParams = useSearchParams();
	const callbackUrl = searchParams.get('callbackUrl') || '/profile';

	const [isVisible, setIsVisible] = useState(false);

	const toggleVisibility = () => setIsVisible((prevState) => !prevState);

	const router = useRouter();

	const {
		register,
		handleSubmit,
		setError,
		setValue,
		formState: { errors },
	} = useForm<Inputs>({
		resolver: yupResolver(validationSchema),
	});

	const onSubmit = async (data: Inputs) => {
		const res = await fetch(`${API_URL}/user/create`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});

		const resJson = await res.json();

		if (resJson?.error) {
			setError(resJson.error.field, {
				type: 'manual',
				message: resJson.error.message,
			});
			if (resJson?.error.field === 'password')
				setError('repeatPassword', {
					type: 'manual',
					message: resJson.error.message,
				});
		}

		if (res.ok) return console.log('ok');

		// if (res?.url) router.push(res.url);
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
					type="text"
					label="Full name"
					placeholder="Jan Kowalski"
					isRequired={true}
					size="md"
					isInvalid={Boolean(errors.name)}
					errorMessage={errors.name?.message}
					{...register('name', { required: true })}
				/>
				<Input
					type="email"
					label="Email"
					placeholder="jan.kowalski@gmail.com"
					isRequired={true}
					size="md"
					isInvalid={Boolean(errors.email)}
					errorMessage={errors.email?.message}
					{...register('email', { required: true })}
				/>
				<Input
					label="Password"
					size="md"
					isRequired={true}
					placeholder="**********"
					isInvalid={Boolean(errors.password)}
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
				<Input
					label="Repeat password"
					size="md"
					isRequired={true}
					placeholder="**********"
					isInvalid={Boolean(errors.repeatPassword)}
					errorMessage={errors.repeatPassword?.message}
					{...register('repeatPassword', { required: true })}
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
				<div>
					<Checkbox
						{...register('termsAndConditions')}
						onValueChange={(value) => setValue('termsAndConditions', value)}
						isInvalid={Boolean(errors.termsAndConditions)}
						required={true}
						color="secondary"
					>
						Terms and conditions
					</Checkbox>
					{Boolean(errors.termsAndConditions) && (
						<p className="text-danger text-tiny m-0 p-0">
							{errors?.termsAndConditions?.message}
						</p>
					)}
				</div>

				<Button
					type="submit"
					color="primary"
					size="md"
					className="w-full bg-purple"
				>
					Create account
				</Button>
				{/*<div className="flex flex-col md:flex-row justify-between items-center">*/}
				{/*	<Link*/}
				{/*		href="/register"*/}
				{/*		title="Create your account"*/}
				{/*		className="text-purple"*/}
				{/*	>*/}
				{/*		Create your account*/}
				{/*	</Link>*/}
				{/*	<Link href="/reset-password" className="text-purple">*/}
				{/*		Reset password*/}
				{/*	</Link>*/}
				{/*</div>*/}
			</form>
		</>
	);
};
