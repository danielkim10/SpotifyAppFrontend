import { useState } from 'react';

import ProfileDropdown from './ProfileDropdown';
import useUserContext from '../../../utilities/hooks/context/useUserContext';
import Button from '../../common/Button';

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
        <div className="absolute right-0 top-1/2 -translate-y-1/2">
            <Button label={user.name} hasAvatar avatarImage={user.images.length > 0 ? user.images[0].url : ""} endIcon="dropdown" dropdownOpen={open} bgColorScheme="grey" handleClick={handleProfileClick}/>
            <ProfileDropdown open={open} anchorElement={anchorElement} closeCallback={handleClose} url={user.spotify_url}/>
        </div>
    );
}

export default ProfileButton;