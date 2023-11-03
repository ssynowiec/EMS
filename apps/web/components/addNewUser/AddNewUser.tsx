import React from 'react';

import {
	Button,
	Input,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	useDisclosure,
} from '@nextui-org/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { PlusIcon } from 'ui';

type Inputs = {
	name: string;
	email: string;
	password: string;
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
});

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const AddNewUser = () => {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm<Inputs>({
		resolver: yupResolver(validationSchema),
	});

	const onSubmit = async (data: Inputs) => {
		console.log(data);

		const res = await fetch(`${API_URL}/user`, {
			method: 'PUT',
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
			// if (resJson?.error.field === 'password')
			// 	setError('repeatPassword', {
			// 		type: 'manual',
			// 		message: resJson.error.message,
			// 	});
		}

		if (res.ok) return onOpenChange();

		// if (res?.url) router.push(res.url);
		// setSubmitting(false);
	};

	return (
		<>
			<Button
				onPress={onOpen}
				className="bg-purple text-white"
				endContent={<PlusIcon />}
			>
				Add new
			</Button>
			<Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
				<ModalContent>
					{(onClose) => (
						<>
							<form onSubmit={handleSubmit(onSubmit)}>
								<ModalHeader className="flex flex-col gap-1">
									Add new user
								</ModalHeader>
								<ModalBody>
									<Input
										autoFocus
										label="Full name"
										placeholder="Jan Kowalski"
										errorMessage={errors.name?.message}
										{...register('name', { required: true })}
									/>

									<Input
										type="email"
										label="Email"
										placeholder="jan.kowalski@gmail.com"
										errorMessage={errors.email?.message}
										{...register('email', { required: true })}
									/>
									<Input
										label="Password"
										placeholder="**********"
										type="password"
										errorMessage={errors.password?.message}
										{...register('password', { required: true })}
									/>
								</ModalBody>
								<ModalFooter>
									<Button color="danger" variant="flat" onPress={onClose}>
										Close
									</Button>
									<Button className="bg-purple text-white" type="submit">
										Add user
									</Button>
								</ModalFooter>
							</form>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
};
