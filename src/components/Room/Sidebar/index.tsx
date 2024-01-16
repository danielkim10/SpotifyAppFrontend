// modules
import { useState } from 'react';

// helpers
import SidebarContext from '../../../utilities/context/SidebarContext';

// components
import SidebarDefault from './SidebarDefault';
import SidebarHistory from './SidebarHistory';
import SidebarSearch from './SidebarSearch';
import SidebarSettings from './SidebarSettings';
import SidebarHeader from './SidebarHeader';

const Sidebar = () => {
    const [option, setOption] = useState<number>(0);

    return (
        <SidebarContext.Provider value={{value: option, callback: (option) => setOption(option)}}>
            <div className="actions-sidebar">
                <SidebarHeader/>
                {                    
                    option === 1 ?
                    <SidebarSearch/> :
                    option === 2 ?
                    <SidebarHistory/> :
                    option === 3 ?
                    <SidebarSettings/> :
                    <SidebarDefault />
                }
            </div>
        </SidebarContext.Provider>
    );
}

export default Sidebar;