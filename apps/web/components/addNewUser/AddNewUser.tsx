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
import { useMutation, useQueryClient } from '@tanstack/react-query';

type Inputs = {
	name: string;
	email: string;
	password: string;
	repeatPassword: string;
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
});

const API_URL = process.env['NEXT_PUBLIC_API_URL'];

export const AddNewUser = () => {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
		reset,
	} = useForm<Inputs>({
		resolver: yupResolver(validationSchema),
	});

	const queryClient = useQueryClient();

	const addUser = useMutation({
		mutationFn: async (data: Inputs) => {
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
				throw new Error(resJson.error.message);
			}
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['users'] });
			onOpenChange();
			reset();
		},
		onError: () => {
			console.log('error');
		},
	});

	const onSubmit = async (data: Inputs) => {
		addUser.mutate(data);
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
									<Input
										label="Reapet password"
										placeholder="**********"
										type="password"
										errorMessage={errors.repeatPassword?.message}
										{...register('repeatPassword', { required: true })}
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
