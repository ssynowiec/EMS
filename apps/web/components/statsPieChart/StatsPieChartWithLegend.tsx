'use client';

import { Card, type Color, DonutChart, Legend, Title } from '@tremor/react';

interface StatsPieChartProps {
	title: string;
	data: { name: string; value: number }[];
	type?: 'pie' | 'donut';
	categories?: string[];
	colors: Color[];
}

const valueFormatter = (number: number) =>
	new Intl.NumberFormat('pl').format(number).toString();

export const StatsPieChartWithLegend = ({
	title,
	data,
	type = 'donut',
	categories = [],
	colors,
}: StatsPieChartProps) => {
	return (
		<Card className="max-w-lg">
			<Title>{title}</Title>
			<div className="flex">
				<DonutChart
					className="mt-6"
					data={data}
					category="value"
					index="name"
					valueFormatter={valueFormatter}
					showAnimation={true}
					colors={colors}
					variant={type}
				/>
				{Boolean(categories) && (
					<Legend className="mt-3" categories={categories} colors={colors} />
				)}
			</div>
		</Card>
	);
};
