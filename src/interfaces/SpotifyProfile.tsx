import Image from './image';

interface SpotifyProfile {
    id: string,
    display_name: string,
    spotify_id: string,
    external_urls: {
        spotify: string,
    }
    images: Image[],
    product: string
}

export default SpotifyProfile;