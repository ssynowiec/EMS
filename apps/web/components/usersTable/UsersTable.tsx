'use client';

import {
	getKeyValue,
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
} from '@nextui-org/react';

const columns = [
	{
		key: 'name',
		label: 'NAME',
	},
	{
		key: 'email',
		label: 'EMAIL',
	},
	{
		key: 'role',
		label: 'ROLE',
	},
	{
		key: 'status',
		label: 'STATUS',
	},
];

export const UsersTable = ({ users }) => {
	return (
		<Table aria-label="Example table with dynamic content">
			<TableHeader columns={columns}>
				{(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
			</TableHeader>
			<TableBody items={users}>
				{(item) => (
					<TableRow key={item.key}>
						{(columnKey) => (
							<TableCell>{getKeyValue(item, columnKey)}</TableCell>
						)}
					</TableRow>
				)}
			</TableBody>
		</Table>
	);
};
