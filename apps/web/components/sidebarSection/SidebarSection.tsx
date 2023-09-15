import type { SidebarLink } from '../dashboardSidebar/DashboardSidebar';
import { SidebarItem } from '../sidebarItem/SidebarItem';

type SidebarSectionProps = {
	title: string;
	links: SidebarLink[];
};

export const SidebarSection = ({ title, links }: SidebarSectionProps) => {
	return (
		<>
			<span className="text-sm font-bold">{title}</span>
			{links.map((link) => (
				<SidebarItem
					href={link.href}
					title={link.title}
					icon={link.icon}
					key={link.href}
				/>
			))}
		</>
	);
};
