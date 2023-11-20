interface CalendarIconWithDateProps {
	date: Date;
}

const months = [
	'Jan',
	'Feb',
	'Mar',
	'Apr',
	'May',
	'June',
	'July',
	'Aug',
	'Sept',
	'Oct',
	'Nov',
	'Dec',
];

export const CalendarIconWithDate = ({ date }: CalendarIconWithDateProps) => {
	return (
		<div className="flex flex-col items-center border w-14 h-16 rounded-lg overflow-hidden">
			<div className="flex flex-row items-center justify-center bg-red-500 w-full text-center text-white border-b-2 px-2 py-1 rounded-t-lg text-xs">
				<p>{months[date.getMonth()]}</p>
			</div>
			<div className="flex justify-center items-center h-full">
				<p className="font-bold text-lg">{date.getDate()}</p>
			</div>
		</div>
	);
};
