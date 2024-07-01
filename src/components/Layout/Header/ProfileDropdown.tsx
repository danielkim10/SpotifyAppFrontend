import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Icon from '@mui/material/Icon';

import ContextMenuOption from '../../../interfaces/options/ContextMenuOption';

const ProfileDropdown = (props: {open: boolean, anchorElement: HTMLElement | null, closeCallback: () => void, url: string}) => {
    const { open, anchorElement, closeCallback, url } = props;
    
    const navigate = useNavigate();
    
    const handleOpenInNewWindowClick = () => {
        window.open(url);
        closeCallback();
    }

    const handleSettingsClick = () => {
        navigate("/settings");
        closeCallback();
    }

    const handleAboutClick = () => {
        navigate("/about");
        closeCallback();
    }

    const handleLogout = () => {
        Cookies.remove('access-token');
        Cookies.remove('refresh-token');
        Cookies.remove('expiry-time');
        navigate("/");
    }

    const contextMenuOptions: ContextMenuOption[] = [
        { name: "View on Spotify", iconName: "open_in_new_rounded", function: handleOpenInNewWindowClick, visible: true },
        { name: "Settings", iconName: "settings_rounded", function: handleSettingsClick, visible: true },
        { name: "About", iconName: "info_rounded", function: handleAboutClick, visible: true },
        { name: "Log out", iconName: "logout_rounded", function: handleLogout, visible: true }
    ]

    const optionClicked = (option: ContextMenuOption) => {
        option.function();
        closeCallback();
    }

    return (
        <Menu open={open} anchorEl={anchorElement} onClose={closeCallback} anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}>
        {
            contextMenuOptions.filter((option) => option.visible).map((option) => {
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

export default ProfileDropdown;