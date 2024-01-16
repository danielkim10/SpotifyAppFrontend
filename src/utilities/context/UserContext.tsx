import { createContext } from 'react';
import User from '../../interfaces/user';

const user = {
    id: "",
    name: "NULL",
    spotify_id: "",
    spotify_url: "",
    images: [],
    product: "free"
}

const UserContext = createContext<User>(user);
export default UserContext;