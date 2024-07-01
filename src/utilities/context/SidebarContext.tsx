import { createContext } from 'react';

interface Sidebar {
    value: string,
    callback: (s: string) => void
};

const sidebar = {
    value: "",
    callback: (s: string) => null
};

const SidebarContext = createContext<Sidebar>(sidebar);
export default SidebarContext;