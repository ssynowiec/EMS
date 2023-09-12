import type { ReactNode } from 'react';

type ButtonProps = {
	onClick?: () => void;
	children?: ReactNode;
};

export const Button = ({ onClick, children }: ButtonProps) => {
	return (
		<button
			onClick={onClick}
			className="my-3 inline-flex items-center justify-center rounded-md text-sm font-medium shadow ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
		>
			{children}
		</button>
	);
};
