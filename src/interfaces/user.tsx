import ImageInterface from './image';

interface User {
    id: string,
    name: string,
    spotify_id: string,
    spotify_url: string,
    images: ImageInterface[],
    product: string
};

export default User;