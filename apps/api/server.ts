import fastify from 'fastify';
import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();
export const server = fastify();

const SECRET_KEY = process.env.SECRET_KEY || 'secret';

server.get('/status', async () => ({ status: 'ok' }));
server.post('/user', async (request, reply) => {
	const { username, password } = request.body as {
		username: string;
		password: string;
	};

	// console.log(username, password);

	const user = await prisma.user.findUnique({
		where: { email: username },
	});

	if (!user) {
		return reply.status(401).send({ message: 'Invalid email or password' });
	}

	// if (user.password !== password) {
	// 	return reply.status(401).send({ message: 'Invalid username or password' });
	// }

	return reply.send({ user });
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
