import { createContext } from 'react';

import Track from '../../interfaces/track';

interface Clipboard {
    items: Array<Track>,
    open: boolean,
    selectedItem: Track | null,
    openClipboard: (b: boolean) => void,
    addItem: (t: Track) => void
};

const clipboard = {
    items: [],
    open: false,
    selectedItem: null,
    openClipboard: (b: boolean) => null,
    addItem: (t: Track) => null
};

const ClipboardContext = createContext<Clipboard>(clipboard);
export default ClipboardContext;