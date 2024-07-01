import { useState, useEffect, useContext } from 'react'

import Track from '../../interfaces/track'

import PlayerCover from './PlayerCover'
import PlayerControlsButtons from './PlayerControls/PlayerControlsButtons'
import PlayerDurationSlider from './PlayerControls/PlayerDurationSlider'
import PlayerVolumeSlider from './PlayerControls/PlayerVolumeSlider'
import PlayerInfo from './PlayerControls/PlayerInfo'
import CurrentTrack from '../../interfaces/currentTrack'
import TrackQueue from '../TrackQueue'
import TokenContext from '../../utilities/context/TokenContext';
import PlayerContext from '../../utilities/context/PlayerContext'

const track: any = {
    album: {
        images: [{
            height: 0,
            width: 0,
            url: "",
            size: ""
        }],
        name: "",
        uri: ""
    },
    artists: [{
        name: "",
        uri: "",
        url: ""
    }],
    duration_ms: 0,
    id: "",
    is_playable: false,
    linked_from: {
        uri: null,
        id: null
    },
    media_type: "",
    name: "",
    track_type: "",
    type: "",
    uid: "",
    uri: ""
}

const Player = () => {
    const [myPlayer, setPlayer] = useState<Spotify.Player | null>(null)
    const [paused, setPaused] = useState(true)
    const [active, setActive] = useState(false)
    const [currentTrack, setCurrentTrack] = useState<CurrentTrack>(track)
    const [position, setPosition] = useState(0)
    const [duration, setDuration] = useState(0)
    const [prevVolume, setPrevVolume] = useState(30)
    const [volume, setVolume] = useState(30)
    const [shuffle, setShuffle] = useState(false)
    const [repeatMode, setRepeatMode] = useState(0)
    const [deviceID, setDeviceID] = useState("")

    const [transferred, setPlaybackTransfer] = useState(false)

    const token = useContext(TokenContext)
    const playerContext = useContext(PlayerContext)

    useEffect(() => {
        const script = document.createElement("script")
        script.src = "https://sdk.scdn.co/spotify-player.js"
        script.async = true
        document.body.appendChild(script);

        // let player: Spotify.Player | null = null;
        
        window.onSpotifyWebPlaybackSDKReady = () => {
            const player = new window.Spotify.Player({
                name: 'Web Playback SDK',
                getOAuthToken: cb => { cb(token.access_token ?? "") },
                volume: 0.3
            })
    
            player.addListener('ready', ({ device_id }) => {
                console.log('Ready with Device ID', device_id)
                setDeviceID(device_id)
            })
    
            player.addListener('not_ready', ({ device_id }) => {
                console.log('Device ID has gone offline', device_id)
            })
    
            player.addListener('player_state_changed', ( state => {
                console.log("Player state changing");
                if (!state) {
                    return;
                }
                // console.log(state)
                setCurrentTrack(state.track_window.current_track);
                setRepeatMode(state.repeat_mode);
                setShuffle(state.shuffle);
                setPaused(state.paused);
                setPosition(state.position);
                setDuration(state.duration);
            
            
                player!!.getCurrentState().then( state => { 
                    (!state) ? setActive(false) : setActive(true) 
                });

                // console.log(position)
                console.log(state.position)
            
            }));

            player.on('initialization_error', ({ message }) => {
                console.error('Failed to initialize', message);
            });

            player.on('authentication_error', ({ message }) => {
                console.error('Failed to authenticate', message);
            });

            player.on('account_error', ({ message }) => {
                console.error('Failed to validate Spotify account', message);
            });

            player.on('playback_error', ({ message }) => {
                console.error('Failed to perform playback', message);
            });

            player.connect()
            
            setPlayer(player)
        }

        return () => {
            console.log("Disconnecting")
            myPlayer?.disconnect();
            setPlaybackTransfer(false)
            playerContext.setPlaybackTransferred(false)
            document.body.removeChild(script);
        }
    }, [])

    const handleTogglePlay = () => {
        console.log('play button pressed');
        myPlayer?.togglePlay().then(() => {
            setPaused(!paused)
        });
    }

    const handlePreviousTrack = () => {
        myPlayer?.previousTrack()
    }

    const handleNextTrack = () => {
        myPlayer?.nextTrack()
    }

    const handleVolumeChange = (event: Event, newVolume: number | number[] ) => {
        myPlayer?.setVolume((newVolume as number) / 100)
        setVolume(newVolume as number)
    }

    const handlePositionChange = (event: Event, newTimestamp: number | number[] ) => {
        console.log(myPlayer)
        myPlayer?.seek(newTimestamp as number)
        setPosition(newTimestamp as number)
    }

    const handleShuffle = () => {
        setShuffle(!shuffle)
    }
    
    const handleRepeat = () => {
        setRepeatMode((repeatMode + 1) % 3)
    }

    const handleMute = () => {
        if (volume > 0) {
            setPrevVolume(volume)
            myPlayer?.setVolume(0)
            setVolume(0)
        }
        else {
            myPlayer?.setVolume(prevVolume)
            setVolume(prevVolume)
        }
    }

    const disconnectPlayer = async () => {
        myPlayer?.disconnect()
        console.log("Player disconnected")
        setCurrentTrack(track)
    }

    return (
        <div className="flex">
            {
                !playerContext.playbackTransferred ?
                <PlayerCover product="premium" deviceID={deviceID}/> :
                <>
                    <PlayerInfo track={currentTrack}/>
                    <div className="footer controls-main">
                        <PlayerControlsButtons
                            paused={paused}
                            shuffle={shuffle}
                            repeatMode={repeatMode}
                            handleShuffle={handleShuffle}
                            handlePreviousTrack={handlePreviousTrack}
                            handleTogglePlay={handleTogglePlay}
                            handleNextTrack={handleNextTrack}
                            handleRepeat={handleRepeat}
                        />
                        <PlayerDurationSlider
                            paused={paused}
                            position={position}
                            duration={duration}
                            handlePositionChange={handlePositionChange}
                        />
                    </div>
                    <div className="footer controls-other">
                        <PlayerVolumeSlider
                            volume={volume}
                            handleMute={handleMute}
                            handleVolumeChange={handleVolumeChange}
                        />
                        <TrackQueue/>
                    </div>
                </>
            }
        </div>
    );
}

export default Player;