import { StatsPieChartWithLegend } from '../../../components/statsPieChart/StatsPieChartWithLegend';
import type { Metadata } from 'next';
import {
	AreaChart as AreaChartTremor,
	Card,
	Grid,
	Tab,
	TabGroup,
	TabList,
	TabPanel,
	TabPanels,
	Title,
} from '@tremor/react';
import { env } from '../../../env.d.mjs';
import {
	getRegisteredUsersLastWeek,
	getUsersByRole,
	usersWithStatus,
} from './filters';

export const metadata: Metadata = {
	title: 'Statistics',
	description: 'Generated by create turbo',
};

const API_URL = env.NEXT_PUBLIC_API_URL;

const getUsers = async () => {
	const res = await fetch(`${API_URL}/users`, {
		method: 'GET',
		cache: 'no-cache',
	});

	return await res.json();
};

const Statistics = async () => {
	const users = await getUsers();

	const usersStatus = usersWithStatus(users);
	const registeredUsersLastWeek = getRegisteredUsersLastWeek(users);
	const usersByRole = getUsersByRole(users);

	return (
		<>
			<h1>Stats</h1>

			<TabGroup className="mt-6">
				<TabList>
					<Tab>Users</Tab>
					<Tab>Detail</Tab>
				</TabList>
				<TabPanels>
					<TabPanel>
						<Grid numItemsMd={2} numItemsLg={3} className="gap-6 mt-6">
							<StatsPieChartWithLegend
								title="Users status"
								data={usersStatus}
								categories={[
									'Active users',
									'Unverified users',
									'Blocked users',
								]}
								colors={['green', 'yellow', 'red']}
							/>
							<StatsPieChartWithLegend
								title="Users by role"
								data={usersByRole}
								categories={['Admins', 'Users']}
								type="pie"
								colors={['red', 'green', 'indigo', 'rose', 'cyan', 'amber']}
							/>
							<Card></Card>
						</Grid>
						<div className="mt-6">
							<Card>
								<Title>Users registered on last week</Title>
								<AreaChartTremor
									className="h-72 mt-4"
									data={registeredUsersLastWeek}
									index="date"
									showAnimation={true}
									categories={['Registered users']}
									colors={['indigo']}
								/>
							</Card>
						</div>
					</TabPanel>
					<TabPanel>
						<div className="mt-6">
							<Card>
								<div className="h-96" />
							</Card>
						</div>
					</TabPanel>
				</TabPanels>
			</TabGroup>
		</>
	);
};

export default Statistics;
