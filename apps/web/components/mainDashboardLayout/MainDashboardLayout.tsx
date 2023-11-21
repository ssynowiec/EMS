import { DashboardSidebar } from '@/components/dashboardSidebar/DashboardSidebar';
import { DashboardNavbar } from '@/components/dashboardNavbar/DashboardNavbar';
import { SidebarProvider } from '../../app/(dashboard)/sidebarContext';

export const MainDashboardLayout = ({ menu, children }) => {
	return (
		<SidebarProvider>
			<main className="flex h-screen">
				<DashboardSidebar menu={menu} />
				<div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
					<DashboardNavbar />
					<section className="w-11/12 mx-auto">{children}</section>
				</div>
			</main>
		</SidebarProvider>
	);
};
