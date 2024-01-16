// modules
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

// mui components
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';

// mui icons
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';

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

    return (
        <>
            <Menu open={open} anchorEl={anchorElement} onClose={closeCallback} anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}>
                <MenuItem onClick={handleOpenInNewWindowClick}>
                    <ListItemIcon>
                        <OpenInNewRoundedIcon/>
                    </ListItemIcon>
                    <ListItemText>
                        View on Spotify
                    </ListItemText>
                </MenuItem>
                <MenuItem onClick={handleSettingsClick}>
                    <ListItemIcon>
                        <SettingsRoundedIcon/>
                    </ListItemIcon>
                    <ListItemText>
                        Settings
                    </ListItemText>
                </MenuItem>
                <MenuItem onClick={handleAboutClick}>
                    <ListItemIcon>
                        <InfoRoundedIcon/>
                    </ListItemIcon>
                    <ListItemText>
                        About
                    </ListItemText>
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                        <LogoutRoundedIcon/>
                    </ListItemIcon>
                    <ListItemText>
                        Log out
                    </ListItemText>
                </MenuItem>
            </Menu>
        </>
    );
}

export default ProfileDropdown;