import { Static, Type } from '@sinclair/typebox';

export const AddEventSchema = Type.Object({
	name: Type.String(),
	slug: Type.String(),
	description: Type.Optional(Type.String()),
	thumbnail: Type.Optional(Type.String()),
	startDate: Type.String(),
	startTime: Type.String(),
	endDate: Type.String(),
	endTime: Type.String(),
	onlineLocation: Type.Optional(Type.String()),
	offlineLocation: Type.Optional(Type.String()),
	organizer: Type.String(),
});

export type AddEventType = Static<typeof AddEventSchema>;
