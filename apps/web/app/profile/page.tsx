const Page = async () => {
	// const session = await getServerSession(authOptions);
	//
	// if (!session) {
	// 	redirect('/login?callbackUrl=/profile');
	// }

	return (
		<section className="py-24">
			<div className="container">
				<h1 className="text-2xl font-bold">Profile</h1>
			</div>
		</section>
	);
};

export default Page;
