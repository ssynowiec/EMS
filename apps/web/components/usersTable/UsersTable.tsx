'use client';

import {
	Link,
	Pagination,
	Spinner,
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
	Tooltip,
} from '@nextui-org/react';
import { type Key, useCallback, useMemo, useState } from 'react';
import { TopContent } from './TopContentUserTable';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { createQueryString } from '../../utils/createQueryString';
import { EditIcon, EyeIcon } from 'ui';
import { DeleteButton } from '../deleteButton/DeleteButton';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const columns = [
	{
		key: 'id',
		label: 'ID',
	},
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
	{ key: 'emailVerified', label: 'EMAIL VERIFIED' },
	{ key: 'createdAt', label: 'CREATED AT' },
	{ key: 'updatedAt', label: 'UPDATED AT' },
	{ key: 'actions', label: 'ACTIONS' },
];

type User = {
	id: string;
	key: string;
	name: string;
	email: string;
	emailVerified: boolean;
	role: string;
};

type Filters = {
	search: string;
	rowsPerPage: string;
	page: string;
	roles: string[];
};

type UsersTableProps = {
	filters: Filters;
};

const INITIAL_VISIBLE_COLUMNS = ['name', 'email', 'role', 'actions'];
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const UsersTable = ({ filters }: UsersTableProps) => {
	const queryClient = useQueryClient();

	const { isPending, data, isFetching } = useQuery({
		queryKey: ['users'],
		queryFn: async () => {
			const res = await fetch(`${API_URL}/users`, {
				method: 'GET',
				cache: 'no-cache',
			});

			return await res.json();
		},
	});

	const deleteUserMutation = useMutation({
		mutationFn: async (userEmail: string) => {
			const res = await fetch(`${API_URL}/user/${userEmail}`, {
				method: 'DELETE',
			});

			const resJson = await res.json();

			if (resJson?.error) {
				throw new Error(resJson.error.message);
			}

			return resJson;
		},
		onSuccess: (data, userEmail) => {
			const currentDataTime = new Date().toLocaleString();

			queryClient.invalidateQueries({ queryKey: ['users'] });
			toast.success('User deleted successfully', {
				description: (
					<p>
						User <span className="font-extrabold">{userEmail}</span> has been
						deleted successfully
						<br />
						<span className="text-[10px]">{currentDataTime}</span>
					</p>
				),
			});
		},
		onError: (error, userEmail) => {
			const currentDataTime = new Date().toLocaleString();

			toast.error('User not deleted', {
				description: (
					<p>
						Something went wrong, user{' '}
						<span className="font-extrabold">{userEmail}</span> has not been
						deleted
						<br />
						<span className="text-[10px]">{currentDataTime}</span>
					</p>
				),
			});
		},
	});

	const {
		search,
		rowsPerPage = '10',
		page = '1',
		roles = 'admin,user',
	} = filters;
	const router = useRouter();
	const pathname = usePathname();

	const [visibleColumns, setVisibleColumns] = useState(
		new Set(INITIAL_VISIBLE_COLUMNS),
	);

	const usersData = useMemo(() => data || [], [data]);
	const selectedRoles = useMemo(() => roles.toUpperCase().split(','), [roles]);

	const searchParams = useSearchParams();

	const filteredUsers = useMemo(() => {
		if (search) {
			return usersData.filter(
				(user: User) =>
					user.name.toLowerCase().includes(search.toLowerCase()) ||
					user.email.toLowerCase().includes(search.toLowerCase()),
			);
		}
		if (roles) {
			return usersData.filter((user: User) =>
				selectedRoles.includes(user.role),
			);
		}
		return usersData;
	}, [search, roles, usersData, selectedRoles]);

	const pages = Math.ceil(filteredUsers.length / parseInt(rowsPerPage)) || 1;

	const items = useMemo(() => {
		const start = (parseInt(page) - 1) * parseInt(rowsPerPage);
		const end = start + parseInt(rowsPerPage);
		return filteredUsers.slice(start, end);
	}, [filteredUsers, page, rowsPerPage]);

	const headerColumns = useMemo(() => {
		// if (visibleColumns.has('all')) return columns;

		return columns.filter((column) =>
			Array.from(visibleColumns).includes(column.key),
		);
	}, [visibleColumns]);

	const deleteUser = async (userEmail: string) => {
		deleteUserMutation.mutate(userEmail);
	};

	const renderCell = useCallback((user: User, columnKey: Key) => {
		const cellValue = user[columnKey as keyof User];

		switch (columnKey) {
			// case 'emailVerified':
			// 	return (
			// 		<Chip
			// 			className="capitalize"
			// 			color={'success'}
			// 			size="sm"
			// 			variant="flat"
			// 		>
			// 			{cellValue != '' ? 'active' : 'inactive'}
			// 		</Chip>
			// 	);
			// case 'email':
			// 	return <Link href={`mailto:${user.email}`}>{user.email}</Link>;
			case 'actions':
				return (
					<div className="relative flex items-center gap-2">
						<Tooltip content="Details">
							<Link
								className="text-lg text-default-400 cursor-pointer active:opacity-50"
								href={`/users/${user.id}`}
							>
								<EyeIcon />
							</Link>
						</Tooltip>
						<Tooltip content="Edit user">
							<Link
								href={`/users/${user.id}/edit`}
								className="text-lg text-default-400 cursor-pointer active:opacity-50"
							>
								<EditIcon />
							</Link>
						</Tooltip>
						<Tooltip color="danger" content="Delete user">
							<span className="text-lg text-danger cursor-pointer active:opacity-50">
								<DeleteButton
									onDelete={() => deleteUser(user.email)}
									objectToDelete={`user ${user.email} `}
								/>
							</span>
						</Tooltip>
					</div>
				);
			default:
				return cellValue;
		}
	}, []);

	return (
		<Table
			aria-label="User table"
			topContent={
				<TopContent
					totalUsers={filteredUsers.length}
					visibleColumns={visibleColumns}
					setVisibleColumns={setVisibleColumns}
					usersData={filteredUsers}
				/>
			}
			isStriped={true}
			bottomContent={
				<div className="flex w-full justify-center">
					<Pagination
						isCompact
						showControls
						showShadow
						color="secondary"
						page={parseInt(page)}
						total={pages}
						onChange={(page) =>
							router.push(
								pathname +
									createQueryString(searchParams, 'page', page.toString()),
							)
						}
					/>
				</div>
			}
		>
			<TableHeader columns={headerColumns}>
				{(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
			</TableHeader>
			<TableBody
				items={items}
				emptyContent="No rows to display."
				isLoading={isPending || isFetching}
				loadingContent={
					<Spinner label="Loading..." size="lg" color="secondary" />
				}
			>
				{(user: User) => (
					<TableRow key={user.key}>
						{(columnKey) => (
							<TableCell>{renderCell(user, columnKey)}</TableCell>
						)}
					</TableRow>
				)}
			</TableBody>
		</Table>
	);
};
