import { useEffect, useContext } from 'react';
import SidebarContext from '../../context/SidebarContext';

const useSidebarCallback = (option: number) => {
    const sidebar = useContext(SidebarContext);
    useEffect(() => {
        sidebar.callback(option);
    }, [sidebar, option])
}

export default useSidebarCallback;