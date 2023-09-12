import type { HTMLInputTypeAttribute } from 'react';
import clsx from 'clsx';

interface InputProps {
	label: string;
	name: string;
	id?: string;
	placeholder?: string;
	type?: HTMLInputTypeAttribute;
	autoComplete?: string;
	required?: boolean;
}

export const Input = ({
	label,
	name,
	id,
	placeholder,
	type = 'text',
	autoComplete,
	required,
	...rest
}: InputProps) => {
	return (
		<div className="w-full">
			<label
				className={clsx(
					type === 'hidden' && 'hidden',
					'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
				)}
				htmlFor={id}
			>
				{label} {required && <span className="text-red-500">*</span>}
			</label>
			<input
				type={type}
				id={id}
				name={name}
				placeholder={placeholder}
				autoComplete={autoComplete}
				required={required}
				{...rest}
				className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
			/>
		</div>
	);
};
