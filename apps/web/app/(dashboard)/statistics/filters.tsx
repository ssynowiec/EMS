export const usersWithStatus = (usersData) => {
	function countUsersWithStatus(
		users: { name: string; status: string }[],
		status: string,
	): number {
		const filteredUsers = users.filter((user) => user.status === status);
		return filteredUsers.length;
	}

	const activeUsers = countUsersWithStatus(usersData, 'ACTIVE');
	const bannedUsers = countUsersWithStatus(usersData, 'BLOCKED');
	const unverifiedUsers = countUsersWithStatus(usersData, 'UNVERIFIED');

	console.log(activeUsers, bannedUsers, unverifiedUsers);

	return [
		{ name: 'Active', value: activeUsers },
		{ name: 'Unverified', value: unverifiedUsers },
		{ name: 'Banned', value: bannedUsers },
	];
};

export const getRegisteredUsersLastWeek = (usersData) => {
	const today = new Date();
	const monthNames = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec',
	];
	const chartData: { date: string; 'Registered users': number }[] = [];

	for (let i = 6; i >= 0; i--) {
		let registeredUsers = 0;
		const date = new Date(today);
		date.setDate(today.getDate() - i);

		usersData.forEach((user: { name: string; createdAt: Date }) => {
			const userDate = new Date(user.createdAt);
			if (
				userDate.getDate() === date.getDate() &&
				userDate.getMonth() === date.getMonth()
			) {
				registeredUsers++;
			}
		});

		const day = date.getDate();
		const month = monthNames[date.getMonth()];

		chartData.push({
			date: i === 0 ? 'today' : `${day} ${month}`,
			'Registered users': registeredUsers,
		});
	}

	return chartData;
};

export const getUsersByRole = (usersData) => {
	function countUsersWithRole(
		users: { name: string; role: string }[],
		role: string,
	): number {
		const filteredUsers = users.filter((user) => user.role === role);
		return filteredUsers.length;
	}

	const admins = countUsersWithRole(usersData, 'ADMIN');
	const users = countUsersWithRole(usersData, 'USER');

	return [
		{ name: 'Admins', value: admins },
		{ name: 'Users', value: users },
	];
};
