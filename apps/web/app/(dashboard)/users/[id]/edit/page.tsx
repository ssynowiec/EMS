'use client';

import { useQuery } from '@tanstack/react-query';

type EditUserPageProps = {
	params: {
		id: string;
	};
};

const API_URL = process.env.NEXT_PUBLIC_API_URL;

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
		</div>
	);
};

export default EditUserPage;
