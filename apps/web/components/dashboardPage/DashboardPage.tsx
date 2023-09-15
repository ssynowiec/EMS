'use client';

import { Card, CardBody } from '@nextui-org/react';

const totalUsers = 10;

export const DashboardPage = () => {
	return (
		<div className="flex w-full gap-4">
			<Card
				shadow="md"
				className="rounded-xl w-1/3 bg-purple text-white"
				isPressable
			>
				<CardBody>
					<p className="font-bold">Users</p>
					<span className="text-3xl font-bold">{totalUsers}</span>
				</CardBody>
			</Card>
			<Card
				shadow="md"
				className="rounded-xl w-1/3 bg-primary text-white"
				isPressable
			>
				<CardBody>
					<p className="font-bold">Card</p>
				</CardBody>
			</Card>
			<Card
				shadow="md"
				className="rounded-xl w-1/3 bg-green-600 text-white"
				isPressable
			>
				<CardBody>
					<p className="font-bold">Card</p>
				</CardBody>
			</Card>
		</div>
	);
};
