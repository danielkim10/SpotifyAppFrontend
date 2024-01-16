import Drawer from '@mui/material/Drawer';

const TrackDrawer = (props: {open: boolean, onClose: () => void}) => {
    const { open, onClose } = props;

    return (
        <Drawer anchor="right" open={open} onClose={onClose}>
            <div className="drawer">
                No songs playing
            </div>
        </Drawer>
    );
}

export default TrackDrawer;