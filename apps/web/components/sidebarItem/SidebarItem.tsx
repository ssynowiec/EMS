import { Button, Link } from '@nextui-org/react';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

type SidebarItemProps = {
	href: string;
	title: string;
	icon?: ReactNode;
};

export const SidebarItem = ({ href, title, icon }: SidebarItemProps) => {
	const pathname = usePathname();

	return (
		<Button
			as={Link}
			href={href}
			className={clsx(
				pathname === href
					? 'bg-purple/20 [&_svg_path]:fill-purple'
					: 'hover:bg-default-100',
				'flex gap-2 w-full min-h-[44px] h-full items-center px-3.5 rounded-xl cursor-pointer transition-all duration-150 active:scale-[0.98]',
			)}
			startContent={icon}
		>
			{title}
		</Button>
	);
};
