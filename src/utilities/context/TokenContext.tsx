import { createContext } from 'react';

interface Token {
    access_token: string,
    refresh_token: string
};

const tokens = {
    access_token: "",
    refresh_token: ""
}

const TokenContext = createContext<Token>(tokens);
export default TokenContext;