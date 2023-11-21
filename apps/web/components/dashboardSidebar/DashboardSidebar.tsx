'use client';

import { Image, Link } from '@nextui-org/react';
import { SidebarSection } from '../sidebarSection/SidebarSection';
import { SidebarFooter } from '../sidebarFooter/sidebarFooter';
import { useSession } from 'next-auth/react';
import clsx from 'clsx';
import { useSidebarContext } from 'app/(dashboard)/sidebarContext';

export const DashboardSidebar = ({ menu }) => {
	const session = useSession();
	const { isSidebarOpen, closeSidebar } = useSidebarContext();
	const userRole = session?.data?.user?.role;

	const closeSidebarClass = 'hidden md:flex';
	const openSidebarClass = 'w-full z-50';

	return (
		<aside
			className={clsx(
				isSidebarOpen ? openSidebarClass : closeSidebarClass,
				'flex flex-col items-center h-full sticky top-0 bg-white md:w-2/12',
			)}
		>
			<div>
				<Link href="/">
					<Image src="/EMS.png" alt="EMS logo" width="100" height="100" />
				</Link>
			</div>
			<div className="flex flex-col justify-between w-full flex-grow">
				<div className="flex flex-col gap-6 px-2">
					<div className="flex gap-2 flex-col">
						{menu.map(
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
