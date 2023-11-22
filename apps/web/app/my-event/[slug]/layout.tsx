import { getEventBySlug } from '../../../utils/getEventBySlug';
import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';
import { MainDashboardLayout } from '@/components/mainDashboardLayout/MainDashboardLayout';
import type { SidebarLink } from '@/types/sidebarLink';

interface EventOrganizerLayoutProps {
	children: ReactNode;
	params: {
		slug: string;
	};
}

let mainSidebarLinks: SidebarLink[] = [
	{
		href: '/my-events',
		title: '<- Back to events',
	},
];

const EventOrganizerLayout = async ({
	children,
	params: { slug },
}: EventOrganizerLayoutProps) => {
	const event = await getEventBySlug(slug);

	if (!event) notFound();

	const dangerZoneLinks: SidebarLink[] = [
		{ href: `./${event.slug}/delete`, title: 'Delete event', color: 'danger' },
	];

	if (event.status === 'DRAFT') {
		mainSidebarLinks = [
			{
				href: '/my-events',
				title: '<- Back to events',
			},
			{
				href: `./${event.slug}/publish`,
				title: 'Publish event',
				color: 'purple',
			},
		];
	} else {
		mainSidebarLinks = [
			{
				href: '/my-events',
				title: '<- Back to events',
			},
		];
	}

	const sidebarSections = [
		{ title: `${event.name}`, links: [], permissions: ['ADMIN', 'USER'] },
		{
			title: '',
			links: mainSidebarLinks,
			permissions: ['ADMIN', 'USER'],
		},
		{
			title: 'Danger Zone 🚫',
			links: dangerZoneLinks,
			permissions: ['ADMIN', 'USER'],
		},
	];

	return (
		<MainDashboardLayout menu={sidebarSections}>{children}</MainDashboardLayout>
	);
};

export default EventOrganizerLayout;
