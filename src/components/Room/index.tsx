import Chat from './Chat';
import Sidebar from './Sidebar';
import Sandbox from './Sandbox';

const RoomLayout = () => {
    return (
        <>
            <Sidebar/>
            <Sandbox />
            <Chat />
        </>
    );
}

export default RoomLayout;