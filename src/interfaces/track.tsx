import AlbumInterface from "./album";
import ArtistInterface from "./artist";

interface Track {
    album: AlbumInterface,
    artists: ArtistInterface[],
    duration_ms: number,
    id: string,
    name: string,
    type: string,
    uri: string
};

export default Track;