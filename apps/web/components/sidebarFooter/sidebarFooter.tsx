import { Button, Divider, Link } from '@nextui-org/react';
import clsx from 'clsx';

export const SidebarFooter = () => {
	return (
		<div className="mt-auto w-full text-center">
			<Divider />
			<Button
				as={Link}
				href="/help"
				radius="none"
				className={clsx(
					'hover:bg-default-100',
					'flex gap-2 w-full min-h-[44px] h-full items-center px-3.5 cursor-pointer transition-all duration-150 active:scale-[0.98] bg-transparent',
				)}
				// startContent={link.icon}
			>
				<span className="text-default-900">Support</span>
			</Button>
		</div>
	);
};
