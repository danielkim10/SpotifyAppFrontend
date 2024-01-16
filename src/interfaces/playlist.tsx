import ImageInterface from "./image";

interface Playlist {
    collaborative: boolean,
    description: string,
    external_urls: {
        spotify: string
    },
    href: string,
    id: string,
    images: ImageInterface[],
    name: string,
    owner: {
        display_name: string,
        id: string
    },
    public: boolean,
    snapshot_id: string,
    tracks: {
        href: string,
        total: number
    }
    type: string,
    uri: string
};

export default Playlist;