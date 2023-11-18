import type { ReactNode } from 'react';
import { DashboardNavbar } from '@/components/dashboardNavbar/DashboardNavbar';
import { DashboardSidebar } from '@/components/dashboardSidebar/DashboardSidebar';
import { SidebarProvider } from './sidebarContext';

type DashboardLayoutProps = {
	children: ReactNode;
};

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
	return (
		<SidebarProvider>
			<main className="flex h-screen">
				<DashboardSidebar />
				<div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
					<DashboardNavbar />
					<section className="w-11/12 mx-auto">{children}</section>
				</div>
			</main>
		</SidebarProvider>
	);
};

export default DashboardLayout;
