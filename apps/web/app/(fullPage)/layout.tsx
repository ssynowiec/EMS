const FullPageCenteredLayout = ({ children }) => {
	return (
		<section className="flex min-h-screen overflow-hidden justify-center items-center">
			{children}
		</section>
	);
};

export default FullPageCenteredLayout;
