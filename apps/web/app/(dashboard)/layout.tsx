import type { ReactNode } from 'react';
import { DashboardNavbar } from '../../components/dashboardNavbar/DashboardNavbar';
import { DashboardSidebar } from '../../components/dashboardSidebar/DashboardSidebar';

type DashboardLayoutProps = {
	children: ReactNode;
};

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
	return (
		// <SidebarProvider>
		<main className="flex h-screen">
			<DashboardSidebar />
			<DashboardNavbar>{children}</DashboardNavbar>
		</main>
		// </SidebarProvider>
	);
};

export default DashboardLayout;
