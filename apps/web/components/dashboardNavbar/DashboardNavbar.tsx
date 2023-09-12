'use client';

import { signOut, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import {
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
	Link,
	Navbar,
	NavbarContent,
	NavbarItem,
	NavbarMenuToggle,
	User,
} from '@nextui-org/react';

export const DashboardNavbar = ({ children }) => {
	const { data: session } = useSession({
		required: true,
		onUnauthenticated() {
			redirect('/login?callbackUrl=/protected');
		},
	});

	const isMenuOpen = false;

	return (
		<div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
			<Navbar isBordered={true} className="w-full">
				<NavbarContent className="md:hidden">
					<NavbarMenuToggle
						aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
					/>
				</NavbarContent>

				<NavbarContent justify="end">
					<Dropdown>
						<NavbarItem>
							<DropdownTrigger>
								{/*<Button variant="bordered" className="p-6">*/}
								<User
									name={session?.user?.name}
									// description="Product Designer"
									avatarProps={{
										isBordered: true,
										color: 'danger',
										size: 'md',
										src: session?.user?.image || '',
									}}
									className="cursor-pointer"
								/>
								{/*</Button>*/}
							</DropdownTrigger>
						</NavbarItem>
						<DropdownMenu aria-label="User menu">
							<DropdownItem onClick={() => console.log('test')} key="test">
								Test
							</DropdownItem>
							<DropdownItem>My profile</DropdownItem>
							<DropdownItem onClick={() => signOut()} key="logout">
								Log out
							</DropdownItem>
						</DropdownMenu>
					</Dropdown>
				</NavbarContent>
				<Link href="#"></Link>
			</Navbar>
			{children}
		</div>
	);
};
