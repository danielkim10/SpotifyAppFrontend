import { createContext } from 'react';

interface Header {
    name: string,
    callback: (s: string) => void
};

const header = {
    name: "",
    callback: (s: string) => null
};

const HeaderContext = createContext<Header>(header);
export default HeaderContext;