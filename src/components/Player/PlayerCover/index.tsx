import { useContext } from 'react';

import TokenContext from '../../../utilities/context/TokenContext';
import PlayerContext from '../../../utilities/context/PlayerContext';
import Button from '../../common/Button';

const PlayerCover = (props: {product: string, deviceID: string }) => {
    const { product, deviceID } = props;

    const token = useContext(TokenContext);
    const player = useContext(PlayerContext);

    const transferPlayback = async () => {
        const res = await fetch("https://api.spotify.com/v1/me/player", {
            method: "PUT", headers: { Authorization: `Bearer ${token.access_token}` },
            body: JSON.stringify({
                "device_ids": [
                    deviceID
                ]
            })
        });

        if (res.ok) {
            console.log("Playback transferred successfully");
            player.setPlaybackTransferred(true);
        }
        else {
            console.error("Error transferring playback");
        }
    }

    return (
        <div className="m-auto">
            {
                product === "premium" ?
                <Button label="Transfer Playback" bgColorScheme="grey" hasAvatar={false} avatarLabel="" handleClick={transferPlayback}/>
                :
                <span>Upgrade to a Spotify Premium subscription to access the web player</span>
            }
        </div>
    );
}

export default PlayerCover;