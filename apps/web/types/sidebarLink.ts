import type { ReactNode } from 'react';

export type SidebarLink = {
	href: string;
	title: string;
	icon?: ReactNode;
	color?: string;
};
