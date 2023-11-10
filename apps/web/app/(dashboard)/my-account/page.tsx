'use client';

import { UserAccount } from '@/components/userAccount/UserAccount';
import { useSession } from 'next-auth/react';

const MyAccount = () => {
	const { data: session } = useSession();

	return (
		<>
			<h1>My Account</h1>
			<UserAccount user={session?.user} />
		</>
	);
};

export default MyAccount;
