'use client';

import { signOut, useSession } from 'next-auth/react';
import {
	Button,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
	Navbar,
	NavbarContent,
	NavbarItem,
	User,
} from '@nextui-org/react';
import { BellIcon } from 'ui';
import { useSidebarContext } from '../../app/(dashboard)/sidebarContext';

const userMenuLinks = [
	{
		onClick: () => console.log('test'),
		title: 'Test',
	},
	{
		onClick: () => signOut(),
		title: 'Log Out',
	},
];

export const DashboardNavbar = () => {
	const { data: session } = useSession();
	const { isSidebarOpen, closeSidebar } = useSidebarContext();

	return (
		<Navbar
			isBordered={true}
			className="w-full"
			classNames={{ wrapper: 'max-w-full' }}
		>
			<NavbarContent className="md:hidden">
				<Button onClick={closeSidebar}></Button>
				{/*<NavbarMenuToggle*/}
				{/*	aria-label={*/}
				{/*		isSidebarOpen ? 'Close sidebar menu' : 'Open sidebar menu'*/}
				{/*	}*/}
				{/*	onClick={closeSidebar}*/}
				{/*/>*/}
			</NavbarContent>

			<NavbarContent justify="end">
				<BellIcon />
				<Dropdown>
					<NavbarItem>
						<DropdownTrigger className="cursor-pointer">
							<User
								name={session?.user?.name}
								description={session?.user?.email}
								avatarProps={{
									isBordered: true,
									color: 'danger',
									size: 'md',
									src: session?.user?.image || '',
								}}
							/>
						</DropdownTrigger>
					</NavbarItem>
					<DropdownMenu aria-label="User menu">
						{userMenuLinks.map((link) => (
							<DropdownItem onClick={link.onClick} key={link.title}>
								{link.title}
							</DropdownItem>
						))}
					</DropdownMenu>
				</Dropdown>
			</NavbarContent>
		</Navbar>
	);
};
