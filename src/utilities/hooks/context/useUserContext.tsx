import { useContext } from 'react';
import UserContext from '../../context/UserContext';

const useUserContext = () => {
    const user = useContext(UserContext);
    console.log(user);
    if (!user) {
        // throw new Error("Expected value for user but received null");
        return {
            id: "",
            name: "NULL",
            spotify_id: "",
            spotify_url: "",
            images: [],
            product: "free"
        }
        // return;
    }
    return user;
}

export default useUserContext;