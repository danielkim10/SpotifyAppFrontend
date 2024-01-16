// modules
import { useEffect, useState } from 'react';
import { Outlet } from "react-router-dom";
import Cookies from 'js-cookie';

// helpers
import User from "../../interfaces/user";
import CurrentTrack from '../../interfaces/currentTrack';
import UserContext from '../../utilities/context/UserContext';

import TokenContext from '../../utilities/context/TokenContext';
import HeaderContext from '../../utilities/context/HeaderContext';
import PlayerContext from '../../utilities/context/PlayerContext';

import Header from "./Header";
import Footer from "./Footer";

const user1 = {
    id: "",
    name: "NULL",
    spotify_id: "",
    spotify_url: "",
    images: [],
    product: "free"
}

const Layout = () => {
    const [loading, setLoading] = useState(true);
    const [accessToken, setAccessToken] = useState("");
    const [refreshToken, setRefreshToken] = useState("");
    const [user, setUser] = useState<User>(user1);
    const [headerName, setHeaderName] = useState("");

    const [playbackTransferred, setPlaybackTransferred] = useState(false);
    const [currentTrack, setCurrentTrack] = useState<CurrentTrack | null>(null);

    useEffect(() => {
        const fetchSpotifyProfile = async (): Promise<any> => {
            const res  = await fetch("https://api.spotify.com/v1/me", {
                method: "GET", headers: { Authorization: `Bearer ${Cookies.get('access_token')}`}
            });

            const json = await res.json();
            if (res.ok) {
                console.log(json);

                var user = {
                    id: "",
                    name: json.display_name,
                    spotify_id: json.id,
                    spotify_url: json.external_urls.spotify,
                    images: json.images,
                    product: json.product
                };
                const resb = await fetch("http://localhost:5000/api/user/", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({name: json.display_name, spotify_id: json.id})
                });
                const json2 = await resb.json();

                if (resb.ok) {
                    user.id = json2.items._id;
                    setUser(user);
                    setLoading(false);
                }
                else {
                    console.log(json2);
                }
            }
            else {
            }
        }

        // if (Cookies.get('expiry_time') && Cookies.get('access_token')) {
        //     console.log(Date.now() < parseInt(Cookies.get('expiry_time')!!.toString()))
        //     if (Date.now() < parseInt(Cookies.get('expiry_time')!!.toString())) {
        setAccessToken(Cookies.get('access_token')!!.toString());
        setRefreshToken(Cookies.get('refresh_token')!!.toString());
        //     }
        //     else {
        //         fetchSpotifyProfile()
        //     }
        // }
        // else {
        fetchSpotifyProfile();
        // }
    }, []);

    return (
        <>
            {!loading ?
                <TokenContext.Provider value={{access_token: accessToken, refresh_token: refreshToken}}>
                    <UserContext.Provider value={user}>
                        <HeaderContext.Provider value={{name: headerName, callback: setHeaderName}}>
                            <PlayerContext.Provider value={{playbackTransferred: playbackTransferred, setPlaybackTransferred: setPlaybackTransferred, currentTrack: currentTrack, setCurrentTrack: setCurrentTrack}}>
                                <Header/>
                                <Outlet/>
                                <Footer/>
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