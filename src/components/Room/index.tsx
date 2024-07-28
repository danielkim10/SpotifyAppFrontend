import Chat from './Chat';
import Sidebar from './Sidebar';
import Sandbox from './Sandbox';
import useMediaQuery from '@mui/material/useMediaQuery';

const RoomLayout = () => {
    const mediaQuery = useMediaQuery('(min-width:1400px)');

    return (
        mediaQuery ?
        <>
            <Sidebar/>
            <Sandbox />
            <Chat />
        </> : 
        <>
            <Sidebar/>
            <Sandbox />
        </>
        
    );
}

export default RoomLayout;