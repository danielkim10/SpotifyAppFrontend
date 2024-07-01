import { createContext } from 'react';

import Track from '../../interfaces/track';

interface Clipboard {
    items: Array<Track>,
    open: boolean,
    selectedItems: Array<Track>,
    openClipboard: (b: boolean) => void,
    addItems: (t: Track[]) => void,
    selectItems: (t: Track[]) => void,
    deselectItems: (t: Track[]) => void,
    removeItems: (t: Track[]) => void
};

const clipboard = {
    items: [],
    open: false,
    selectedItems: [],
    openClipboard: (b: boolean) => null,
    addItems: (t: Track[]) => null,
    selectItems: (t: Track[]) => null,
    deselectItems: (t: Track[]) => null,
    removeItems: (t: Track[]) => null
};

const ClipboardContext = createContext<Clipboard>(clipboard);
export default ClipboardContext;