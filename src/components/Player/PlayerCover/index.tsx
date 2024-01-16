import { useContext } from 'react';

import TokenContext from '../../../utilities/context/TokenContext';
import PlayerContext from '../../../utilities/context/PlayerContext';

const PlayerCover = (props: {product: string, deviceID: string, setTransfer: () => void}) => {
    const { product, deviceID, setTransfer } = props;

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
            setTransfer();
            player.setPlaybackTransferred(true);
        }
        else {
            console.error("Error transferring playback");
        }
    }

    return (
        <div className="player-cover">
            {
                product === "premium" ?
                <div className="transfer-playback-button" onClick={transferPlayback}>
                    <b className="profile-button-items">Transfer Playback</b>
                </div>
                :
                <span>Upgrade to a Spotify Premium subscription to access the web player</span>
            }
        </div>
    );
}

export default PlayerCover;