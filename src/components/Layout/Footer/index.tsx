// modules
import { useContext } from 'react';

import TokenContext from '../../../utilities/context/TokenContext';
import Player from '../../Player';
import useUserContext from '../../../utilities/hooks/context/useUserContext';

const Footer = () => {

    const user = useUserContext();
    const token = useContext(TokenContext);

    return (
        <footer>
            <div className="container">
                {
                    token.access_token ? <Player/> : <></>
                }
            </div>
        </footer>
    );
}

export default Footer;