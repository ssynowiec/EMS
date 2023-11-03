import fastify from 'fastify';
import { PrismaClient } from '@prisma/client';
import cors from '@fastify/cors';

export const prisma = new PrismaClient();
export const server = fastify();

const SECRET_KEY = process.env.SECRET_KEY || 'secret';

server.register(cors, {
	origin: true,
	credentials: true,
	allowedHeaders: ['Content-Type', 'Authorization'],
	methods: ['GET', 'POST', 'PUT', 'DELETE'],
});

server.get('/status', async () => ({ status: 'ok' }));
server.post('/user', async (request, reply) => {
	const { username, password } = request.body as {
		username: string;
		password: string;
	};

	const user = await prisma.user.findUnique({
		where: { email: username },
	});

	console.log(user);

	if (!user) {
		return reply.status(401).send({ message: 'Invalid email or password' });
	}

	if (user.password == undefined) {
		return reply.status(401).send({ message: 'Please try login with Google' });
	}

	if (user.emailVerified === null) {
		return reply.status(400).send({ message: 'Please verify your email' });
	}

	if (user.password !== password) {
		return reply.status(401).send({ message: 'Invalid username or password' });
	}

	return reply.send(user);
});

server.get('/users', async () => {
	return await prisma.user.findMany();
});

server.get('/user/:id', async (request, reply) => {
	const { id } = request.params as { id: string };

	const user = await prisma.user.findUnique({
		where: { id: id },
	});

	if (!user) {
		return reply.status(404).send({ message: 'User not found' });
	}

	return reply.send(user);
});

server.put('/user', async (request, reply) => {
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
});

server.delete('/user/:email', async (request, reply) => {
	const { email } = request.params as { email: string };

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
});

// for (const schema of [...userSchemas, ...eventSchemas]) {
// 	server.addSchema(schema);
// }

const PORT = (process.env.PORT || 4000) as number;
const start = async () => {
	// server.register(userRouter, { prefix: 'api/users' });
	// server.register(eventRouter, { prefix: 'api/events' });
	// server.register(sessionRouter, { prefix: 'api/session' });

	try {
		await server.listen({ port: PORT });

		server
			.addresses()
			.map((address) =>
				console.log(
					`🚀 (${address.family}) Server is listening at http://${address.address}:${address.port}`,
				),
			);
	} catch (err) {
		server.log.error(err);
		process.exit(1);
	}
};

await start();
