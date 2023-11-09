'use client';

import { useQuery } from '@tanstack/react-query';
import { UserAccount } from '../../../../../components/userAccount/UserAccount';
import { env } from '../../../../../env.d.mjs';

type EditUserPageProps = {
	params: {
		id: string;
	};
};

const API_URL = env.NEXT_PUBLIC_API_URL;

const EditUserPage = ({ params: { id } }: EditUserPageProps) => {
	const query = useQuery({
		queryKey: ['user', id],
		queryFn: async () => {
			const res = await fetch(`${API_URL}/user/${id}`);
			return res.json();
		},
	});

	const user = query.data || {};

	return (
		<div>
			Edit user: <span className="font-bold">{user.name}</span>
			<UserAccount user={user} />
		</div>
	);
};

export default EditUserPage;
