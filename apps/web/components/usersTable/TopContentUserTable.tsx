import {
	Button,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
	Input,
} from '@nextui-org/react';
import { AddNewUser } from '../addNewUser/AddNewUser';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ChevronDownIcon, SearchIcon } from 'ui';
import { createQueryString } from '../../utils/createQueryString';
import { columns } from './UsersTable';
import { CSVLink } from 'react-csv';

export const TopContent = ({
	totalUsers,
	visibleColumns,
	setVisibleColumns,
	usersData,
}) => {
	const router = useRouter();
	const pathname = usePathname();

	const searchParams = useSearchParams();
	const search = searchParams.get('search') || '';
	const rowsPerPage = searchParams.get('rowsPerPage') || '10';
	const page = searchParams.get('page') || '1';

	const rowsPerPageOptions = [2, 10, 15];

	return (
		<div className="flex flex-col gap-4">
			<div className="flex justify-between gap-3 items-end">
				<Input
					isClearable
					className="w-full sm:max-w-[44%]"
					placeholder="Search by name or email"
					startContent={<SearchIcon />}
					defaultValue={search}
					onClear={() => () =>
						router.push(
							pathname + createQueryString(searchParams, 'search', ''),
						)
					}
					onValueChange={(value) =>
						router.push(
							pathname + createQueryString(searchParams, 'search', value),
						)
					}
				/>
				<div className="flex gap-3">
					<Button>
						<CSVLink
							data={usersData}
							filename="All_Users"
							className="w-full h-full flex justify-center items-center"
						>
							Export .csv
						</CSVLink>
					</Button>

					<Dropdown>
						<DropdownTrigger className="hidden sm:flex">
							<Button endContent={<ChevronDownIcon />} variant="flat">
								Status
							</Button>
						</DropdownTrigger>
						<DropdownMenu
							disallowEmptySelection
							aria-label="Table Columns"
							closeOnSelect={false}
							selectedKeys={'all'}
							selectionMode="multiple"
							// onSelectionChange={setStatusFilter}
						>
							<DropdownItem className="capitalize">All</DropdownItem>
							{/*{statusOptions.map((status) => (*/}
							{/*	<DropdownItem key={status.uid} className="capitalize">*/}
							{/*		{capitalize(status.name)}*/}
							{/*	</DropdownItem>*/}
							{/*))}*/}
						</DropdownMenu>
					</Dropdown>
					<Dropdown>
						<DropdownTrigger className="hidden sm:flex">
							<Button endContent={<ChevronDownIcon />} variant="flat">
								Columns
							</Button>
						</DropdownTrigger>
						<DropdownMenu
							disallowEmptySelection
							aria-label="Table Columns"
							closeOnSelect={false}
							selectedKeys={visibleColumns}
							selectionMode="multiple"
							onSelectionChange={setVisibleColumns}
						>
							{columns.map((column) => (
								<DropdownItem key={column.key} className="capitalize">
									{column.label}
								</DropdownItem>
							))}
						</DropdownMenu>
					</Dropdown>
					<AddNewUser />
				</div>
			</div>
			<div className="flex justify-between items-center">
				<span className="text-default-400 text-small">
					{parseInt(page) === 1
						? 1
						: parseInt(rowsPerPage) * (parseInt(page) - 1) + 1}{' '}
					-{' '}
					{parseInt(page) == Math.ceil(totalUsers / parseInt(rowsPerPage))
						? totalUsers
						: parseInt(rowsPerPage) * parseInt(page)}{' '}
					of {totalUsers}
				</span>
				<label className="flex items-center text-default-400 text-small">
					Rows per page:
					<select
						className="bg-transparent outline-none text-default-400 text-small"
						defaultValue={rowsPerPage}
						onChange={(e) => {
							router.push(
								pathname +
									createQueryString(
										searchParams,
										'rowsPerPage',
										e.target.value,
									),
							);
						}}
					>
						{rowsPerPageOptions.map((option, id) => (
							<option value={option} key={id}>
								{option}
							</option>
						))}
					</select>
				</label>
			</div>
		</div>
	);
};
