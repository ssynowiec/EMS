import { Static, Type } from '@sinclair/typebox';

export const UserSchema = Type.Object({
	name: Type.String(),
	email: Type.String(),
});

export const AddUserSchema = Type.Object({
	name: Type.String(),
	email: Type.String(),
	password: Type.String(),
	repeatPassword: Type.String(),
});

export type UserType = Static<typeof UserSchema>;
export type AddUserType = Static<typeof AddUserSchema>;
