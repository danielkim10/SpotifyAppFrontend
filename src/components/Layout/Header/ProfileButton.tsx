import { useState} from 'react';
import Avatar from '@mui/material/Avatar';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded';

import ProfileDropdown from './ProfileDropdown';
import useUserContext from '../../../utilities/hooks/context/useUserContext';

const ProfileButton = () => {
    const [open, setOpen] = useState(false);
    const [anchorElement, setAnchorElement] = useState<HTMLElement | null>(null);

    const user = useUserContext();

    const handleProfileClick = (event: React.MouseEvent<HTMLDivElement>) => {
        setAnchorElement(event.currentTarget);
        setOpen(true);
    }

    const handleClose = () => {
        setAnchorElement(null);
        setOpen(false);
    }

    return (
        <>
            <div className="profile-button" onClick={handleProfileClick}>
                {
                    user.images.length > 0 ?
                    <Avatar alt={user.name} src={user.images[0].url} className="profile-button-items"/>
                    :
                    <Avatar alt={user.name} className="profile-button-items">{user.name.slice(0,1)}</Avatar>
                }
                <b className="profile-button-items">{user.name}</b>
                {open ? <ExpandLessRoundedIcon className="profile-button-items"/> : <ExpandMoreRoundedIcon className="profile-button-items"/>}
            </div>
            <ProfileDropdown open={open} anchorElement={anchorElement} closeCallback={handleClose} url={user.spotify_url}/>
        </>
    );
}

export default ProfileButton;