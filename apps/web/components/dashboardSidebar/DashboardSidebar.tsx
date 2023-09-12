'use client';

import { Image, Link } from '@nextui-org/react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

type SidebarLink = {
	href: string;
	title: string;
};

const userSidebarLinks: SidebarLink[] = [
	{ href: '/dashboard', title: 'Home' },
	{ href: '/settings', title: 'Home' },
	{ href: '/users', title: 'Home' },
	{ href: '/Logout', title: 'Home' },
];
const adminSidebarLinks: SidebarLink[] = [];

export const DashboardSidebar = () => {
	const { data: session } = useSession({
		required: true,
		onUnauthenticated() {
			redirect('/login?callbackUrl=/protected');
		},
	});

	const sidebarLinks =
		session?.user?.role === 'user' ? userSidebarLinks : adminSidebarLinks;

	return (
		<aside className={'h-full sticky top-0 bg-white'}>
			<div>
				<Link href="/">
					<Image src="./EMS.png" alt="EMS logo" width="100" height="100" />
				</Link>
			</div>
			<div className="flex flex-col justify-between w-full">
				{userSidebarLinks.map((link) => (
					<Link href={link.href} key={link.href}>
						{link.title}
					</Link>
				))}
			</div>
		</aside>
	);
};
