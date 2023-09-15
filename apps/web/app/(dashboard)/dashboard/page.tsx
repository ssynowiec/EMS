import type { Metadata } from 'next';
import { DashboardPage } from '../../../components/dashboardPage/DashboardPage';

export const metadata: Metadata = {
	title: 'Dashboard | EMS',
	description: 'Generated by create turbo',
};

const Dashboard = () => {
	return (
		<>
			<h1>Dashboard</h1>
			<DashboardPage />
		</>
	);
};

export default Dashboard;