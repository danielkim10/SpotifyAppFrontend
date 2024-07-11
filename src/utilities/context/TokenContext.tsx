import { createContext } from 'react';

interface Token {
    access_token: string,
    refresh_token: string,
    setAccessToken: (t: string) => void
};

const tokens = {
    access_token: "",
    refresh_token: "",
    setAccessToken: (t: string) => null
}

const TokenContext = createContext<Token>(tokens);
export default TokenContext;