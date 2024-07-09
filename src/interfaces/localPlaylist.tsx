import ImageInterface from './image';

interface LocalPlaylist {
    id: string,
    spotify_id: string,
    name: string,
    description: string,
    owner: {
        name: string
    },
    images: ImageInterface[],
    updatedAt: string,
};

export default LocalPlaylist;