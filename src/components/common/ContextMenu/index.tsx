import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Icon from '@mui/material/Icon';

import ContextMenuOption from '../../../interfaces/options/ContextMenuOption';

const ContextMenu = (props: {
    open: boolean,
    anchorPosition: { top: number, left: number },
    options: ContextMenuOption[],
    onClose: () => void
}) => {
    const { open, anchorPosition, options, onClose } = props;

    const optionClicked = (option: ContextMenuOption) => {
        option.function();
        onClose();
    }

    return (
        <Menu open={open} anchorPosition={{top: anchorPosition.top, left: anchorPosition.left}} anchorReference="anchorPosition" onClose={onClose}>
            {
                options.filter((option) => option.visible).map((option) => {
                    return (
                        <MenuItem onClick={() => optionClicked(option)}>
                            <ListItemIcon><Icon>{option.iconName}</Icon></ListItemIcon>
                            <ListItemText>{option.name}</ListItemText>
                        </MenuItem>
                    );
                })
            }
        </Menu>
    );
}

export default ContextMenu;