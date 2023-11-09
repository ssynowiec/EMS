'use client';

import { Card, DonutChart, Title } from '@tremor/react';

interface StatsPieChartProps {
	title: string;
	data: { name: string; value: number }[];
}

const valueFormatter = (number: number) =>
	`total: ${new Intl.NumberFormat('pl').format(number).toString()}`;

export const StatsPieChart = ({ title, data }: StatsPieChartProps) => {
	return (
		<Card className="max-w-lg">
			<Title>{title}</Title>
			<DonutChart
				className="mt-6"
				data={data}
				category="value"
				index="name"
				valueFormatter={valueFormatter}
				colors={['green', 'yellow', 'red']}
			/>
		</Card>
	);
};
