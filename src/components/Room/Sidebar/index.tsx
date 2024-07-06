import { useState } from 'react';

import SidebarContext from '../../../utilities/context/SidebarContext';
import SidebarDefault from './SidebarDefault';
import SidebarHistory from './SidebarHistory';
import SidebarSearch from './SidebarSearch';
import SidebarSettings from './SidebarSettings';
import SidebarClipboard from './SidebarClipboard';
import SidebarHeader from './SidebarHeader';

const Sidebar = () => {
    const [option, setOption] = useState("");

    return (
        <SidebarContext.Provider value={{value: option, callback: (option) => setOption(option)}}>
            <div className="bg-black min-w-[300px] my-5 pt-5">
                <SidebarHeader/>
                {                    
                    option === "Search" ?
                    <SidebarSearch/> :
                    option === "History" ?
                    <SidebarHistory/> :
                    option === "Settings" ?
                    <SidebarSettings/> :
                    option === "Clipboard" ?
                    <SidebarClipboard/> :
                    <SidebarDefault />
                }
            </div>
        </SidebarContext.Provider>
    );
}

export default Sidebar;