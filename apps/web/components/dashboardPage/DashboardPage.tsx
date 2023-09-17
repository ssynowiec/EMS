'use client';

import { Card, CardBody } from '@nextui-org/react';
import { DashboardCard } from '../dashboardCard';

export const DashboardPage = () => {
	return (
		<div className="flex w-full gap-4">
			<DashboardCard title="Users" />
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
