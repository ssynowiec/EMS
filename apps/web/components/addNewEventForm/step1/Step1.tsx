import { Input, Textarea } from '@nextui-org/react';
import { DndFile } from '@/components/dndFile/DndFile';
import { useDropzone } from 'react-dropzone';
import { useCallback, useState } from 'react';
import { useFormContext } from 'react-hook-form';

export const Step1 = () => {
	const {
		register,
		setValue,
		formState: { errors },
	} = useFormContext();

	const [eventThumbnail, setEventThumbnail] = useState<
		string | ArrayBuffer | null
	>('');

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
		[setValue],
	);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: {
			'image/png': [],
			'image/jpeg': [],
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
				errorMessage={errors.eventName?.message}
				{...register('eventName')}
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
				errorMessage={errors.eventUrl?.message}
				{...register('eventUrl')}
			/>

			<DndFile
				label="Event thumbnail"
				register={register}
				getInputProps={getInputProps}
				getRootProps={getRootProps}
				isDragActive={isDragActive}
				fileThumbnail={eventThumbnail}
			/>

			<Textarea
				label="Event description"
				labelPlacement="outside"
				placeholder="My event is the best event in the world!"
				isInvalid={Boolean(errors.eventDescription)}
				errorMessage={errors.eventDescription?.message}
				{...register('eventDescription')}
			/>
		</>
	);
};
