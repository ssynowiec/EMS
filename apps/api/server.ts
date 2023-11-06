import fastify from 'fastify';
import { PrismaClient } from '@prisma/client';
import cors from '@fastify/cors';

import { userRoutes } from './routes/user';

export const prisma = new PrismaClient();
export const server = fastify();

const SECRET_KEY = process.env.SECRET_KEY || 'secret';

server.register(cors, {
	origin: true,
	credentials: true,
	allowedHeaders: ['Content-Type', 'Authorization'],
	methods: ['GET', 'POST', 'PUT', 'DELETE'],
});

server.register(userRoutes);

server.get('/status', async () => ({ status: 'ok' }));

// for (const schema of [...userSchemas, ...eventSchemas]) {
// 	server.addSchema(schema);
// }

const PORT = (process.env.PORT || 4000) as number;
const start = async () => {
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
