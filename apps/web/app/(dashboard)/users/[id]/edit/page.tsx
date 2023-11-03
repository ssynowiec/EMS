type EditUserPageProps = {
	params: {
		id: string;
	};
};

const EditUserPage = ({ params }: EditUserPageProps) => {
	return <div>User id: {params.id}</div>;
};

export default EditUserPage;
