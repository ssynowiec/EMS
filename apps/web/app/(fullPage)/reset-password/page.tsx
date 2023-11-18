import { ResetPassword } from '@/components/resetPasswordPage/ResetPasswordPage';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Reset password to your account',
	description: 'Generated by create turbo',
};

const ResetPasswordPage = () => {
	return <ResetPassword />;
};

export default ResetPasswordPage;
