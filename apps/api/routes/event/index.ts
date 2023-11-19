import { type FastifyTypebox, prisma } from '../../server';
import { AddEventSchema, GetEventBySlugSchema } from './event.type';

export const eventRoutes = async (server: FastifyTypebox) => {
	server.get('/all', async () => {
		return await prisma.event.findMany();
	});

	server.get(
		'/:slug',
		{ schema: { params: GetEventBySlugSchema } },
		async (request, reply) => {
			const slug = request.params.slug;
			// if (!event) {
			// 	return reply.status(404).send({ message: 'Event not found' });
			// }
			return await prisma.event.findUnique({ where: { slug } });
		},
	);

	server.post(
		'/create',
		{ schema: { body: AddEventSchema } },
		async (request, reply) => {
			const data = request.body;
			console.log(data);

			const newEvent = await prisma.event.create({
				data: { ...data, organizer: { connect: { id: data.organizer } } },
			});

			console.log(newEvent);

			return reply.status(201).send(newEvent);
		},
	);
};
