'use client';

import { Image, Link } from '@nextui-org/react';
import type { ReactNode } from 'react';
import { HomeIcon, SettingsIcon } from 'ui';
import { SidebarSection } from '../sidebarSection/SidebarSection';
import { SidebarItem } from '../sidebarItem/SidebarItem';
import { SidebarFooter } from '../sidebarFooter/sidebarFooter';

export type SidebarLink = {
	href: string;
	title: string;
	icon?: ReactNode;
};

const userSidebarLinks: SidebarLink[] = [
	{
		href: '/settings',
		title: 'Settings',
		icon: <SettingsIcon />,
	},
	{ href: '/users', title: 'Users' },
	{ href: '/Logout', title: 'Home' },
];

const sidebarSections = [
	{
		title: 'Admin',
		links: userSidebarLinks,
	},
];

export const DashboardSidebar = () => {
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
						{sidebarSections.map((section) => (
							<SidebarSection
								key={section.title}
								title={section.title}
								links={section.links}
							/>
						))}
					</div>
				</div>
			</div>
			<SidebarFooter />
		</aside>
	);
};
