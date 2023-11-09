import type { Metadata } from 'next';
import { Button, Link } from '@nextui-org/react';
import { EditIcon } from 'ui';
import { env } from '../../../../env.d.mjs';

type UserPageProps = {
	params: {
		id: string;
	};
};

type Props = {
	params: { id: string };
	searchParams: { [key: string]: string | string[] | undefined };
};

const API_URL = env.NEXT_PUBLIC_API_URL;

const getUser = async (userId: string) => {
	const res = await fetch(`${API_URL}/user/${userId}`);

	if (res.status === 404) return null;

	return res.json();
};

export const generateMetadata = async ({
	params,
}: Props): Promise<Metadata> => {
	const id = params.id;

	const user = await getUser(id);

	if (!user) return { title: 'User not found' };

	return {
		title: `User: ${user.name} details`,
	};
};

const UserPage = async ({ params: { id } }: UserPageProps) => {
	const user = await getUser(id);

	if (!user)
		return (
			<section className="h-full w-full flex justify-center items-center flex-col">
				<h1>User not found</h1>
				<Button as={Link} href="/users" className="bg-purple text-white">
					Back to all users
				</Button>
			</section>
		);

	return (
		<>
			<h1>
				User: <span className="font-bold">{user.name}</span>
			</h1>
			<Button
				href={`/users/${id}/edit`}
				as={Link}
				className="bg-purple text-white"
				startContent={<EditIcon />}
			>
				Edit user
			</Button>
		</>
	);
};

export default UserPage;
