'use client';

import { Flex, ProgressCircle, Text } from '@tremor/react';
import { Card, CardBody } from '@nextui-org/react';

interface PercentageRegisteredUsersProps {
	value: number;
	maxValue: number;
	title: string;
}

export const CardWithProgressCircle = ({
	value,
	maxValue,
	title,
}: PercentageRegisteredUsersProps) => {
	const percentage = (value / maxValue) * 100;

	return (
		<Card className="w-full font-bold" shadow="md">
			<CardBody className="flex flex-row justify-between items-center">
				<Flex className="space-x-5" justifyContent="center">
					<ProgressCircle
						value={percentage}
						size="md"
						strokeWidth={9}
						showAnimation={true}
					>
						<span className="text-xs text-gray-700 font-medium">
							{percentage}%
						</span>
					</ProgressCircle>
					<div>
						<Text className="font-medium text-gray-700">
							{value}/{maxValue}
						</Text>
						<Text>{title}</Text>
					</div>
				</Flex>
			</CardBody>
		</Card>
	);
};
