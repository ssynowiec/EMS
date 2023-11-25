import { type FastifyTypebox, prisma } from '../../server';
import {
	AddEventSchema,
	GetEventBySlugSchema,
	GetEventParticipantsByEventIdSchema,
} from './event.type';

export const eventRoutes = async (server: FastifyTypebox) => {
	server.get('/all', async () => {
		return await prisma.event.findMany();
	});

	server.get(
		'/:slug',
		{ schema: { params: GetEventBySlugSchema } },
		async (request, reply) => {
			const slug = request.params.slug;

			return await prisma.event.findUnique({
				where: { slug },
				include: {
					_count: {
						select: { Attendees: true },
					},
				},
			});
		},
	);

	server.get(
		'/:id/participants',
		{ schema: { params: GetEventParticipantsByEventIdSchema } },
		async (request, reply) => {
			const id = request.params.id;

			return await prisma.attendees.findMany({
				where: { eventId: id },
				include: { user: true },
			});
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
