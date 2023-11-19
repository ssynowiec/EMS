'use client';

import { Avatar, Button, Input, Select, SelectItem } from '@nextui-org/react';
import { type ChangeEvent, useState } from 'react';
import { DateRangePicker, type DateRangePickerValue } from '@tremor/react';
import { useSession } from 'next-auth/react';
import { useFormContext } from 'react-hook-form';

export const Step2 = () => {
	const {
		register,
		setValue,
		getValues,
		formState: { errors },
	} = useFormContext();

	const session = useSession();
	const user = session?.data?.user;

	const [eventType, setEventType] = useState(
		getValues('eventType') || 'hybrid',
	);
	const handleSelectionChange = (e: ChangeEvent<HTMLSelectElement>) => {
		setValue('eventType', e.target.value);
		setEventType(e.target.value);
	};

	const handleDateChange = (value: DateRangePickerValue) => {
		setValue('eventStartDate', value.from);
		setValue('eventEndDate', value.to);
	};

	const users = [
		{
			id: user?.id,
			name: user?.name,
			email: user?.email,
			avatar: user?.image,
		},
	];

	return (
		<>
			<Select
				{...register('organizer')}
				onSelectionChange={(e) =>
					e !== 'all' && setValue('organizer', e.values().next().value)
				}
				items={users}
				label="Organizer"
				labelPlacement="outside"
				placeholder="Select organizer"
				className="max-w-xs"
				isRequired={true}
				selectedKeys={'all'}
				// isDisabled={true}
				disallowEmptySelection={true}
				classNames={{
					// label: 'group-data-[filled=true]:-translate-y-5',
					trigger: 'min-h-unit-16',
					listboxWrapper: 'max-h-[400px]',
				}}
				// listboxProps={{
				// 	itemClasses: {
				// 		base: [
				// 			'rounded-md',
				// 			'text-default-500',
				// 			'transition-opacity',
				// 			'data-[hover=true]:text-foreground',
				// 			'data-[hover=true]:bg-default-100',
				// 			'dark:data-[hover=true]:bg-default-50',
				// 			'data-[selectable=true]:focus:bg-default-50',
				// 			'data-[pressed=true]:opacity-70',
				// 			'data-[focus-visible=true]:ring-default-500',
				// 		],
				// 	},
				// }}
				// popoverProps={{
				// 	classNames: {
				// 		base: 'before:bg-default-200',
				// 		content: 'p-0 border-small border-divider bg-background',
				// 	},
				// }}
				renderValue={(items) => {
					return items.map((item) => (
						<div key={item.key} className="flex items-center gap-2">
							<Avatar
								alt={item.data?.name || 'Organizer'}
								className="flex-shrink-0"
								size="sm"
								src={item.data?.avatar || '/avatar.png'}
							/>
							<div className="flex flex-col">
								<span>{item.data?.name}</span>
								<span className="text-default-500 text-tiny">
									({item.data?.email})
								</span>
							</div>
						</div>
					));
				}}
			>
				{(user) => (
					<SelectItem key={user.id} textValue={user.name}>
						<div className="flex gap-2 items-center">
							<Avatar
								alt={user.name || 'Organizer'}
								className="flex-shrink-0"
								size="sm"
								src={user.avatar || '/avatar.png'}
							/>
							<div className="flex flex-col">
								<span className="text-small">{user.name}</span>
								<span className="text-tiny text-default-400">{user.email}</span>
							</div>
						</div>
					</SelectItem>
				)}
			</Select>
			<Select
				label="Select event type"
				labelPlacement="outside"
				placeholder="online/offline/hybrid"
				className="max-w-xs"
				selectedKeys={[eventType]}
				disallowEmptySelection={true}
				{...register('eventType', {
					onChange: handleSelectionChange,
				})}
			>
				<SelectItem key="online" value="online">
					online
				</SelectItem>
				<SelectItem key="offline" value="offline">
					offline
				</SelectItem>
				<SelectItem key="hybrid" value="hybrid">
					hybrid
				</SelectItem>
			</Select>
			{(eventType === 'online' || eventType === 'hybrid') && (
				<Input
					type="url"
					label="Event online Location"
					labelPlacement="outside"
					placeholder="https://example.com"
					description="for example: link to the event on Zoom, Google Meet, YouYube live etc."
					isRequired={true}
					isInvalid={Boolean(errors.eventOnlineLocation)}
					errorMessage={errors.eventOnlineLocation?.message?.toString()}
					defaultValue={getValues('eventOnlineLocation') || ''}
					{...register('eventOnlineLocation', { required: true })}
				/>
			)}
			{(eventType === 'offline' || eventType === 'hybrid') && (
				<Input
					label="Event location"
					labelPlacement="outside"
					placeholder="Warsaw, Poland"
					isRequired={true}
					isInvalid={Boolean(errors.eventLocation)}
					errorMessage={errors.eventLocation?.message?.toString()}
					defaultValue={getValues('eventLocation') || ''}
					{...register('eventLocation', { required: true })}
				/>
			)}

			<label className="text-small font-medium after:content-['*'] after:text-danger after:ml-0.5">
				Event date
			</label>
			<DateRangePicker
				placeholder="Select start and end date"
				{...register('eventStartDate')}
				defaultValue={{
					from: getValues('eventStartDate'),
					to: getValues('eventEndDate'),
				}}
				onValueChange={handleDateChange}
				enableSelect={false}
				enableYearNavigation={true}
				minDate={new Date()}
			/>

			<Input
				type="time"
				label="Start time"
				labelPlacement="outside"
				placeholder="HH:MM"
				isInvalid={Boolean(errors.eventStartTime)}
				errorMessage={errors.eventStartTime?.message?.toString()}
				defaultValue={getValues('eventStartTime') || ''}
				{...register('eventStartTime')}
			/>

			<Input
				type="time"
				label="End time"
				labelPlacement="outside"
				placeholder="HH:MM"
				isInvalid={Boolean(errors.eventEndTime)}
				errorMessage={errors.eventEndTime?.message?.toString()}
				defaultValue={getValues('eventEndTime') || ''}
				{...register('eventEndTime')}
			/>
			<Button type="submit">Log data</Button>
		</>
	);
};
