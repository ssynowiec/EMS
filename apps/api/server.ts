import fastify, {
	FastifyBaseLogger,
	FastifyInstance,
	RawReplyDefaultExpression,
	RawRequestDefaultExpression,
	RawServerDefault,
} from 'fastify';
import { PrismaClient } from '@prisma/client';
import cors from '@fastify/cors';

import { userRoutes } from './routes/user';
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';

export const prisma = new PrismaClient();
export const server = fastify().withTypeProvider<TypeBoxTypeProvider>();

export type FastifyTypebox = FastifyInstance<
	RawServerDefault,
	RawRequestDefaultExpression<RawServerDefault>,
	RawReplyDefaultExpression<RawServerDefault>,
	FastifyBaseLogger,
	TypeBoxTypeProvider
>;

server.register(cors, {
	origin: true,
	credentials: true,
	allowedHeaders: ['Content-Type', 'Authorization'],
	methods: ['GET', 'POST', 'PUT', 'DELETE'],
});

server.register(userRoutes);

server.get('/status', async () => ({ status: 'ok' }));

const PORT = Number(process.env.PORT) || 4000;
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
