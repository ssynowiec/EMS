import { Input, Textarea } from '@nextui-org/react';
import { DndFile } from '@/components/dndFile/DndFile';
import { useDropzone } from 'react-dropzone';
import { type ChangeEvent, useCallback } from 'react';
import { useFormContext } from 'react-hook-form';
import { env } from '../../../env.d.mjs';

const validateSlug = async (value: string) => {
	if (!value) return 'Event URL is required';

	const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/event/${value}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	});

	const data = await res.json();

	if (!data) {
		if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value))
			return 'Event URL must contain only lowercase alphanumeric characters or dashes';
		if (value.length > 50) return 'Event URL must be less than 50 characters';
		return true;
	} else {
		return 'Event URL is already taken';
	}
};

export const Step1 = ({ eventThumbnail, setEventThumbnail }) => {
	const {
		register,
		setValue,
		setError,
		clearErrors,
		getValues,
		formState: { errors },
	} = useFormContext();

	const onDrop = useCallback(
		(acceptedFiles: File[]) => {
			const file = new FileReader();

			const thumbnailFile = acceptedFiles[0];

			file.onload = () => {
				setValue('eventThumbnail', thumbnailFile);
				setEventThumbnail(file.result);
			};

			file.readAsDataURL(acceptedFiles[0]);
		},
		[setEventThumbnail, setValue],
	);

	const handleSlugChange = async (e: ChangeEvent<HTMLInputElement>) => {
		clearErrors('eventUrl');
		const isValid = await validateSlug(e.target.value);
		if (isValid === true) {
			setValue('eventUrl', e.target.value);
		} else {
			setError('eventUrl', { message: isValid });
		}
	};

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: {
			'image/png': [],
			'image/jpeg': [],
			'image/webp': [],
		},
		maxSize: 10485760,
		multiple: false,
	});

	return (
		<>
			<Input
				label="Event name"
				labelPlacement="outside"
				placeholder="Event test"
				isRequired={true}
				isInvalid={Boolean(errors.eventName)}
				errorMessage={errors.eventName?.message?.toString()}
				defaultValue={getValues('eventName') || ''}
				{...register('eventName', { required: true })}
			/>
			<Input
				label="Event URL"
				labelPlacement="outside"
				placeholder="event-test"
				type="text"
				startContent={
					<div className="pointer-events-none flex items-center">
						<span className="text-default-400 text-small">https://ems.pl/</span>
					</div>
				}
				isRequired={true}
				isInvalid={Boolean(errors.eventUrl)}
				errorMessage={errors.eventUrl?.message?.toString()}
				defaultValue={getValues('eventUrl') || ''}
				{...register('eventUrl', {
					required: true,
					onChange: handleSlugChange,
				})}
			/>

			<DndFile
				label="Event thumbnail"
				getInputProps={getInputProps}
				getRootProps={getRootProps}
				isDragActive={isDragActive}
				fileThumbnail={eventThumbnail}
			/>
			<p className="text-tiny text-foreground-400">
				.webp, .png, .jpg, .jpeg, preferred image size: 1920x1080
			</p>

			<Textarea
				label="Event description"
				labelPlacement="outside"
				placeholder="My event is the best event in the world!"
				isInvalid={Boolean(errors.eventDescription)}
				errorMessage={errors.eventDescription?.message?.toString()}
				defaultValue={getValues('eventDescription') || ''}
				{...register('eventDescription')}
			/>
		</>
	);
};
