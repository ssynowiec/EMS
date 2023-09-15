'use client';

import { createContext, type ReactNode, useContext, useState } from 'react';

type SidebarContextType = {
	isSidebarOpen: boolean;
	closeSidebar: () => void;
};

export const SidebarContext = createContext<SidebarContextType>({
	isSidebarOpen: false,
	closeSidebar: () => {},
});

export const useSidebarContext = () => {
	return useContext(SidebarContext);
};

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	const closeSidebar = () => setIsSidebarOpen((prevState) => !prevState);

	return (
		<SidebarContext.Provider value={{ isSidebarOpen, closeSidebar }}>
			{children}
		</SidebarContext.Provider>
	);
};
