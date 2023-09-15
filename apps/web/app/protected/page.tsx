'use client';

import { signOut, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { Avatar, Button } from '@nextui-org/react';

const ClientProtectPage = () => {
	const { data: session } = useSession({
		required: true,
		onUnauthenticated() {
			redirect('/login?callbackUrl=/protected');
		},
	});

	return (
		<section className="py-24">
			<pre>{JSON.stringify(session, null, 2)}</pre>
			<div className="container">
				<h1 className="text-2xl font-bold">
					This is a <span className="text-emerald-500">client-side</span>{' '}
					protected page
				</h1>
				<Button onClick={() => signOut()}>Sign out</Button>
				<h2 className="mt-4 font-medium">You are logged in as:</h2>
				<Avatar
					isBordered={true}
					src={session?.user?.image || ''}
					color="danger"
				/>
				<p className="mt-4">{session?.user?.name}</p>
			</div>
		</section>
	);
};

export default ClientProtectPage;
