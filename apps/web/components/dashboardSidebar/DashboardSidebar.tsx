'use client';

import { Image, Link } from '@nextui-org/react';
import type { ReactNode } from 'react';
import { HomeIcon, PlusIcon, SettingsIcon } from 'ui';
import { SidebarSection } from '../sidebarSection/SidebarSection';
import { SidebarItem } from '../sidebarItem/SidebarItem';
import { SidebarFooter } from '../sidebarFooter/sidebarFooter';
import { useSession } from 'next-auth/react';

export type SidebarLink = {
	href: string;
	title: string;
	icon?: ReactNode;
	color?: string;
};

const userSidebarLinks: SidebarLink[] = [
	{
		href: '/settings',
		title: 'Settings',
		icon: <SettingsIcon />,
	},
	{ href: '/statistics', title: 'Statistics' },
	{ href: '/users', title: 'Users' },
	{ href: '/Logout', title: 'Home' },
];

const mainSidebarLinks: SidebarLink[] = [
	{
		href: '/add-event',
		title: 'Add Event',
		icon: <PlusIcon />,
		color: 'purple',
	},
];

const sidebarSections = [
	{
		title: '',
		links: mainSidebarLinks,
		permissions: ['ADMIN', 'USER'],
	},
	{
		title: 'Admin',
		links: userSidebarLinks,
		permissions: ['ADMIN'],
	},
];

export const DashboardSidebar = () => {
	const session = useSession();
	const userRole = session?.data?.user?.role;

	return (
		<aside className="flex flex-col items-center h-full sticky top-0 bg-white w-2/12">
			<div>
				<Link href="/">
					<Image src="/EMS.png" alt="EMS logo" width="100" height="100" />
				</Link>
			</div>
			<div className="flex flex-col justify-between w-full flex-grow">
				<div className="flex flex-col gap-6 px-2">
					<div className="flex gap-2 flex-col">
						<SidebarItem href="/dashboard" title="Home" icon={<HomeIcon />} />
						{sidebarSections.map(
							(section) =>
								section.permissions.includes(userRole) && (
									<SidebarSection
										key={section.title}
										title={section.title}
										links={section.links}
									/>
								),
						)}
					</div>
				</div>
			</div>
			<SidebarFooter />
		</aside>
	);
};
