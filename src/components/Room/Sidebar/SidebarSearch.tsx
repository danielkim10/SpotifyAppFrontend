// modules
import { useState, useEffect, useContext } from 'react'

// helpers
import TokenContext from '../../../utilities/context/TokenContext';
// components
import SearchBar from "../../common/SearchBar"

// mui components
import CircularProgress from '@mui/material/CircularProgress';
import TrackItem from '../../common/TracksPanel/TrackItem';
import Track from '../Sandbox/Track';

const SidebarSearch = () => {
    const [text, setText] = useState("")
    const [cachedText, setCachedText] = useState("")
    const [loading, setLoading] = useState(false);

    const [tracks, setTracks] = useState([]);

    const token = useContext(TokenContext)

    useEffect(() => {
        if (text !== "" && text !== cachedText) {
            setLoading(true);
            const intervalID = setInterval(() => {
                // setLoading(true);
                const search = async () => {
                    const res = await fetch("https://api.spotify.com/v1/search?" + new URLSearchParams({
                        q: text,
                        type: "track"
                    }), {
                        method: "GET", headers: { Authorization: `Bearer ${token.access_token}` }
                    })
                    const json = await res.json()
                    if (res.ok) {
                        console.log(json)
                        setTracks(json.tracks.items);
                    }
                    else {
                        console.error(json.error)
                    }
                    setLoading(false);
                    setCachedText(text)
                }
                search()
            }, 1500)

            return () => clearInterval(intervalID)
        }
        else if (text === "") {
            setTracks([]);
            setLoading(false);
        }
    }, [text, cachedText, token])

    const searchBarInterface = {
        id: "item-search-textfield",
        placeholder: "Search",
        className: "search-bar",
        value: text,
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value),
        onClear: () => setText("")
    }

    return (
        <div className="sidebar">
            <SearchBar searchBarInterface={searchBarInterface}/>
            {
                loading ? 
                <CircularProgress/> : 
                    tracks.length > 0 ? 
                    tracks.map((track, index) => {
                        return <Track track={track}/>
                    }) : 
                    <>
                        No results
                    </>
            }
        </div>
    )
}

export default SidebarSearch