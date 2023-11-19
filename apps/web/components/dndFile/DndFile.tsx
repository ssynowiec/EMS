import { Image } from '@nextui-org/react';
import { useFormContext } from 'react-hook-form';

export const DndFile = ({
	label,
	getRootProps,
	getInputProps,
	isDragActive,
	fileThumbnail,
}) => {
	const { register } = useFormContext();

	return (
		<>
			<label className="text-small font-medium">{label}</label>
			<div
				{...getRootProps()}
				className="border-2 border-dashed border-amber-950 h-44 p-4 rounded-lg relative flex flex-col justify-center items-center gap-2"
			>
				<input
					type="file"
					{...getInputProps()}
					placeholder="Event thumbnail"
					accept="image/png, image/jpeg, image/jpg"
					{...register('eventThumbnail')}
				/>
				{!fileThumbnail &&
					(isDragActive ? (
						<p>Drop the files here ...</p>
					) : (
						<p>{`Drag 'n' drop some files here, or click to select files`}</p>
					))}
				{fileThumbnail && (
					<Image
						src={fileThumbnail}
						alt="Thumb"
						width="1000"
						height="1000"
						className="max-h-40 w-auto"
					/>
				)}
			</div>
		</>
	);
};
