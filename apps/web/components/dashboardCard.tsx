import { Card, CardBody } from '@nextui-org/react';
import { env } from '../env.d.mjs';

type DashboardCardProps = {
	title: string;
};

const API_URL = env.NEXT_PUBLIC_API_URL;

export const DashboardCard = async ({ title }: DashboardCardProps) => {
	const res = await fetch(`${API_URL}/users`);
	const users = await res.json();
	const totalUsers = users.length;

	return (
		<Card
			shadow="md"
			className="rounded-xl w-1/3 bg-purple text-white"
			isPressable
		>
			<CardBody>
				<p className="font-bold">{title}</p>
				<span className="text-3xl font-bold">{totalUsers}</span>
			</CardBody>
		</Card>
	);
};
