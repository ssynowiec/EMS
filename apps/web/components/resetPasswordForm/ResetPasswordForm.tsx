'use client';

import { Button, Input, Link } from '@nextui-org/react';

export const ResetPasswordForm = () => {
	return (
		<>
			<form className="flex flex-col w-full flex-wrap md:flex-nowrap gap-4">
				<Input
					type="email"
					label="Email"
					placeholder="jan.kowalski@gmail.com"
					isRequired={true}
					size="md"
				/>
				<Button
					color="primary"
					size="md"
					// onClick={() => signIn('credentials', { callbackUrl })}
					className="w-full bg-purple"
				>
					Reset password
				</Button>
				<div className="flex flex-col md:flex-row justify-between items-center">
					<Link
						href="/register"
						title="Create your account"
						className="text-purple"
					>
						Create your account
					</Link>
					<Link href="/login" className="text-purple">
						Log in
					</Link>
				</div>
			</form>
		</>
	);
};
