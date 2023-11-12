import { Static, Type } from '@sinclair/typebox';

export const LoginUserSchema = Type.Object({
	email: Type.String(),
	password: Type.String(),
});

export const AddUserSchema = Type.Object({
	name: Type.String(),
	email: Type.String(),
	password: Type.String(),
	repeatPassword: Type.String(),
});

export const SearchUserByIdSchema = Type.Object({
	id: Type.String(),
});

export const DeleteUserByEmailSchema = Type.Object({
	email: Type.String(),
});

export const VerifyUserSchema = Type.Object({
	token: Type.String(),
});

export type LoginUserType = Static<typeof LoginUserSchema>;
export type AddUserType = Static<typeof AddUserSchema>;
export type SearchUserByIdType = Static<typeof SearchUserByIdSchema>;
export type DeleteUserByEmailType = Static<typeof DeleteUserByEmailSchema>;
export type VerifyUserType = Static<typeof VerifyUserSchema>;
