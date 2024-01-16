// modules
import { useEffect, useContext } from 'react'

// helpers
import SidebarContext from '../../../utilities/context/SidebarContext'
import useSocketContext from '../../../utilities/hooks/context/useSocketContext'

const SidebarHistory = () => {
    const sidebarOption = useContext(SidebarContext)
    const socketObject = useSocketContext();

    useEffect(() => {
        sidebarOption.callback(2);

        const getRoomHistory = async () => {
            const res = await fetch(`http://localhost:5000/api/action/${socketObject.roomID}`, {
                method: "GET", headers: { "Content-Type": "application/json" }
            })
            const json = await res.json();
            if (res.ok) {
                console.log(json);
            }
            else {
                console.error(json.error);
            }
        }
        getRoomHistory();

    }, [sidebarOption, socketObject.roomID]);

    return (
        <div className="sidebar">
            
        </div>
    )
}

export default SidebarHistory