import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

const PlaylistContextMenu = (props: {
    open: boolean,
    anchorPosition: {top: number, left: number},
    options: string[],
    onClose: () => void
}) => {
    const { open, anchorPosition, options, onClose } = props;

    return (
        <Menu open={open} anchorPosition={{top: anchorPosition.top, left: anchorPosition.left}} anchorReference='anchorPosition' onClose={onClose}>
            <MenuItem>
                <ListItemText>Paste</ListItemText>
            </MenuItem>
            {
                options.find((o) => o === "View") ?
                <MenuItem>
                    <ListItemText>View</ListItemText>
                </MenuItem> : <></>
            }
            {
                options.find((o) => o === "Edit") ?
                <MenuItem>
                    <ListItemText>Edit Details</ListItemText>
                </MenuItem> : <></>
            }
            {
                options.find((o) => o === "Delete") ?
                <MenuItem>
                    <ListItemText>Delete</ListItemText>
                </MenuItem> : <></>
            }
        </Menu>
    );
}

export default PlaylistContextMenu;