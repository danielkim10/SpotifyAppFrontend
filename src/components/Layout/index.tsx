import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';
import { io } from 'socket.io-client';
import { Socket } from 'socket.io-client';
import { DefaultEventsMap } from '@socket.io/component-emitter';

import User from '../../interfaces/user';
import CurrentTrack from '../../interfaces/currentTrack';
import UserContext from '../../utilities/context/UserContext';
import TokenContext from '../../utilities/context/TokenContext';
import HeaderContext from '../../utilities/context/HeaderContext';
import PlayerContext from '../../utilities/context/PlayerContext';
import Header from './Header';
import Footer from './Footer';
import { getUserProfile } from '../../utilities/functions/api/local/User';
import { getSpotifyProfile } from '../../utilities/functions/api/spotify/Me';
import SocketContext from '../../utilities/context/SocketContext';

const Layout = () => {
    const [socket, setSocket] = useState<Socket<DefaultEventsMap, DefaultEventsMap> | null>(null)
    const [loading, setLoading] = useState(true);
    const [accessToken, setAccessToken] = useState("");
    const [refreshToken, setRefreshToken] = useState("");
    const [user, setUser] = useState<User | null>(null);
    const [headerName, setHeaderName] = useState("");

    const [playbackTransferred, setPlaybackTransferred] = useState(false);
    const [currentTrack, setCurrentTrack] = useState<CurrentTrack | null>(null);

    useEffect(() => {
        const fetchSpotifyProfile = async () => {
            const spotifyProfile = await getSpotifyProfile(Cookies.get('access_token')!!);
            if (spotifyProfile) {
                const userID = await getUserProfile(spotifyProfile.display_name, spotifyProfile.id);
                var user = {
                    id: userID,
                    name: spotifyProfile.display_name,
                    spotify_id: spotifyProfile.id,
                    spotify_url: spotifyProfile.external_urls.spotify,
                    images: spotifyProfile.images,
                    product: spotifyProfile.product
                };

                setUser(user);
                setLoading(false);
            }
        }
        
        fetchSpotifyProfile();
        setAccessToken(Cookies.get('access_token')!!.toString());
        setRefreshToken(Cookies.get('refresh_token')!!.toString());
    }, []);

    useEffect(() => {
        const newSocket = io("http://localhost:5000")
        setSocket(newSocket)

        return () => {
            socket?.disconnect()
        }
    }, [])

    return (
        <>
            {!loading && user && socket ?
                <TokenContext.Provider value={{access_token: accessToken, refresh_token: refreshToken, setAccessToken: setAccessToken}}>
                    <UserContext.Provider value={user}>
                        <HeaderContext.Provider value={{name: headerName, callback: setHeaderName}}>
                            <PlayerContext.Provider value={{playbackTransferred: playbackTransferred, setPlaybackTransferred: setPlaybackTransferred, currentTrack: currentTrack, setCurrentTrack: setCurrentTrack}}>
                                <SocketContext.Provider value={ socket }>
                                    <Header/>
                                    <Outlet/>
                                    <Footer/>
                                </SocketContext.Provider>
                            </PlayerContext.Provider>
                        </HeaderContext.Provider>
                    </UserContext.Provider>
                </TokenContext.Provider> :
                <></>
            }
        </>
    );
}

export default Layout;