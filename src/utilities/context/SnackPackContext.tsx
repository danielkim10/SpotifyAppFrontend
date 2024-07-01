import { createContext } from 'react';

interface SnackPack {
    changeSnackPackMessage: (message: string) => void
};

const snackPack = {
    changeSnackPackMessage: (message: string) => null
}

const SnackPackContext = createContext<SnackPack>(snackPack);
export default SnackPackContext;