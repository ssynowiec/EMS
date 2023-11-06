import { Static, Type } from '@sinclair/typebox';

export const User = Type.Object({
	name: Type.String(),
	email: Type.String(),
});

export const AddUser = Type.Object({
	name: Type.String(),
	email: Type.String(),
	password: Type.String(),
	repeatPassword: Type.String(),
});

export type UserType = Static<typeof User>;
export type AddUserType = Static<typeof AddUser>;
