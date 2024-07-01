import ImageInterface from './image';

interface LocalPlaylist {
    id: string,
    spotify_id: string,
    name: string,
    description: string,
    images: ImageInterface[],
    
};

export default LocalPlaylist;