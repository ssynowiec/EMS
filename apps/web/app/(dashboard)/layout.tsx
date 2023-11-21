import type { ReactNode } from 'react';
import { MainDashboardLayout } from '@/components/mainDashboardLayout/MainDashboardLayout';
import { HomeIcon, PlusIcon, SettingsIcon } from 'ui';
import { type SidebarLink } from '@/types/sidebarLink';

type DashboardLayoutProps = {
	children: ReactNode;
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
		href: '/dashboard',
		title: 'Home',
		icon: <HomeIcon />,
	},
	{
		href: '/add-event',
		title: 'Add Event',
		icon: <PlusIcon />,
		color: 'purple',
	},
];

const organizerSidebarLinks: SidebarLink[] = [
	{ href: '/my-events', title: 'My events' },
];

const sidebarSections = [
	{
		title: '',
		links: mainSidebarLinks,
		permissions: ['ADMIN', 'USER'],
	},
	{
		title: 'Organizer',
		links: organizerSidebarLinks,
		permissions: ['ADMIN', 'USER'],
	},
	{
		title: 'Admin',
		links: userSidebarLinks,
		permissions: ['ADMIN'],
	},
];

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
	return (
		<MainDashboardLayout menu={sidebarSections}>{children}</MainDashboardLayout>
	);
};

export default DashboardLayout;
