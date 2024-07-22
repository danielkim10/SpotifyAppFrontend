import { createContext } from 'react';
import Token from '../../interfaces/Token';

const tokens = {
    access_token: "",
    refresh_token: "",
    setAccessToken: (t: string) => null
}

const TokenContext = createContext<Token>(tokens);
export default TokenContext;