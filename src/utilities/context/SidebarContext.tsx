import { createContext } from 'react';

interface Sidebar {
    value: number,
    callback: (n: number) => void
};

const sidebar = {
    value: 0,
    callback: (n: number) => null
};

const SidebarContext = createContext<Sidebar>(sidebar);
export default SidebarContext;