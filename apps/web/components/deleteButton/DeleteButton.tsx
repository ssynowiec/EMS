import { DeleteIcon } from 'ui';
import {
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	useDisclosure,
} from '@nextui-org/react';

type DeleteButtonProps = {
	onDelete: () => void;
	objectToDelete?: string;
};

export const DeleteButton = ({
	onDelete,
	objectToDelete = '',
}: DeleteButtonProps) => {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	const handleDelete = () => {
		onDelete();
		onOpenChange();
	};

	return (
		<>
			<button className="flex justify-center items-center" onClick={onOpen}>
				<DeleteIcon />
			</button>
			<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader>Are you sure?</ModalHeader>
							<ModalBody>
								<p>
									Are you sure you want to delete{' '}
									<span className="font-extrabold inline">
										{objectToDelete}
									</span>
									?
								</p>
							</ModalBody>
							<ModalFooter>
								<Button onPress={onClose}>No, Cancel</Button>
								<Button
									color="danger"
									onPress={handleDelete}
									startContent={<DeleteIcon />}
								>
									Yes, Delete
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
};
