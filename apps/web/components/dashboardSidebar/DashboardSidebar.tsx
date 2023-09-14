'use client';

import { Button, Divider, Image, Link } from '@nextui-org/react';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import type { ReactNode } from 'react';
import { HomeIcon, SettingsIcon } from 'ui';

type SidebarLink = {
	href: string;
	title: string;
	isActive: boolean;
	icon?: ReactNode;
};

const userSidebarLinks: SidebarLink[] = [
	{
		href: '/settings',
		title: 'Settings',
		isActive: false,
		icon: <SettingsIcon />,
	},
	{ href: '/users', title: 'Users', isActive: false },
	{ href: '/Logout', title: 'Home', isActive: false },
];
const adminSidebarLinks: SidebarLink[] = [];

export const DashboardSidebar = () => {
	const pathname = usePathname();
	const { data: session } = useSession();

	const sidebarLinks =
		session?.user?.role === 'user' ? userSidebarLinks : adminSidebarLinks;

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
						<Button
							as={Link}
							href="/dashboard"
							className={clsx(
								pathname === '/dashboard'
									? 'bg-purple/20 [&_svg_path]:fill-purple'
									: 'hover:bg-default-100',
								'flex gap-2 w-full min-h-[44px] h-full items-center px-3.5 rounded-xl cursor-pointer transition-all duration-150 active:scale-[0.98]',
							)}
							startContent={<HomeIcon />}
						>
							Home
						</Button>
						<span className="text-sm font-bold">Admin</span>
						{userSidebarLinks.map((link) => (
							<Button
								as={Link}
								href={link.href}
								key={link.href}
								className={clsx(
									pathname === link.href
										? 'bg-purple/20 [&_svg_path]:fill-purple'
										: 'hover:bg-default-100',
									'flex gap-2 w-full min-h-[44px] h-full items-center px-3.5 rounded-xl cursor-pointer transition-all duration-150 active:scale-[0.98]',
								)}
								startContent={link.icon}
							>
								{/*<div*/}
								{/*	className={clsx(*/}
								{/*		link.isActive*/}
								{/*			? 'bg-purple/20 [&_svg_path]:fill-purple'*/}
								{/*			: 'hover:bg-default-100',*/}
								{/*		'flex gap-2 w-full min-h-[44px] h-full items-center px-3.5 rounded-xl cursor-pointer transition-all duration-150 active:scale-[0.98]',*/}
								{/*	)}*/}
								{/*	// onClick={handleClick}*/}
								{/*>*/}
								{/*{link.icon}*/}
								<span className="text-default-900">{link.title}</span>
								{/*</div>*/}
							</Button>
						))}
					</div>
				</div>
			</div>
			<div className="mt-auto w-full text-center">
				<Divider />
				<Button
					as={Link}
					href="/help"
					radius="none"
					// key={link.href}
					className={clsx(
						'hover:bg-default-100',
						'flex gap-2 w-full min-h-[44px] h-full items-center px-3.5 cursor-pointer transition-all duration-150 active:scale-[0.98] bg-transparent',
					)}
					// startContent={link.icon}
				>
					<span className="text-default-900">Support</span>
				</Button>
			</div>
		</aside>
	);
};
