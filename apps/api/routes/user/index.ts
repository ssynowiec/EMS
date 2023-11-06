'use strict';

import { type FastifyTypebox, prisma } from '../../server';
import {
	AddUserSchema,
	DeleteUserByEmailSchema,
	LoginUserSchema,
	SearchUserByIdSchema,
} from './user.type';

export const userRoutes = async (server: FastifyTypebox) => {
	server.get('/users', async () => {
		return await prisma.user.findMany({
			select: {
				id: true,
				name: true,
				email: true,
				emailVerified: true,
				status: true,
				role: true,
				createdAt: true,
				updatedAt: true,
			},
		});
	});

	server.put(
		'/user',
		{ schema: { body: AddUserSchema } },
		async (request, reply) => {
			const { name, email, password, repeatPassword } = request.body;

			// TODO: Full name Regex
			const nameRegex = /^[A-Z]([-']?[a-z]+)*( [A-Z](([-'][A-Z])?[a-z]+)*)+$/gm;

			// if (nameRegex.test(name)) {
			// 	return reply
			// 		.status(400)
			// 		.send({ errors: { name: { message: 'Invalid Full name.' } } });
			// }

			const user = await prisma.user.findUnique({
				where: { email },
			});

			if (user)
				return reply.status(409).send({
					error: { field: 'email', message: 'User already exists.' },
				});

			if (password !== repeatPassword)
				return reply.status(400).send({
					error: { field: 'password', message: 'Passwords do not match.' },
				});

			const newUser = await prisma.user.create({
				data: {
					name,
					email,
					password,
				},
			});
			return reply.status(200).send(newUser);
		},
	);

	server.post(
		'/user',
		{ schema: { body: LoginUserSchema } },
		async (request, reply) => {
			const { email, password } = request.body;
			console.log('email', email);

			const user = await prisma.user.findUnique({
				where: { email: email },
			});

			if (!user) {
				return reply.status(401).send({ message: 'Invalid email or password' });
			}

			if (user.password == undefined) {
				return reply
					.status(401)
					.send({ message: 'Please try login with Google' });
			}

			if (user.emailVerified === null) {
				return reply.status(400).send({ message: 'Please verify your email' });
			}

			if (user.password !== password) {
				return reply
					.status(401)
					.send({ message: 'Invalid username or password' });
			}

			return reply.send(user);
		},
	);

	server.get(
		'/user/:id',
		{ schema: { params: SearchUserByIdSchema } },
		async (request, reply) => {
			const { id } = request.params;

			const user = await prisma.user.findUnique({
				where: { id: id },
			});

			const accounts = await prisma.account.findMany({
				where: { userId: id },
				select: {
					provider: true,
				},
			});

			if (!user) {
				return reply.status(404).send({ message: 'User not found' });
			}

			return reply.send({ ...user, accounts: accounts });
		},
	);

	server.delete(
		'/user/:email',
		{ schema: { params: DeleteUserByEmailSchema } },
		async (request, reply) => {
			const { email } = request.params;

			try {
				const deletedItem = await prisma.user.delete({
					where: { email: email },
				});

				if (deletedItem) {
					return reply.send(true);
				} else {
					reply.code(404);
					return { error: 'Rekord nie istnieje' };
				}
			} catch (error) {
				reply.code(500);
				return { error: 'Wystąpił błąd podczas usuwania rekordu' };
			}
		},
	);
};

export default userRoutes;
