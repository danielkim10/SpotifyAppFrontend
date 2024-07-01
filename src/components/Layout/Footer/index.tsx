import { useContext } from 'react';

import TokenContext from '../../../utilities/context/TokenContext';
import Player from '../../Player';

const Footer = () => {
    const token = useContext(TokenContext);

    return (
        <footer className="bg-black min-h-default-footer-height">
            {
                token.access_token ? <Player/> : <></>
            }
        </footer>
    );
}

export default Footer;