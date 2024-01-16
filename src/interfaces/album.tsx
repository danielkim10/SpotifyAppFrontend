import ArtistInterface from "./artist";
import ImageInterface from "./image";

interface Album {
    album_type: string,
    artists: ArtistInterface[],
    id: string,
    images: ImageInterface[]
    name: string,
    release_date: string,
    release_date_precision: string,
    total_tracks: number,
    type: string
};

export default Album;