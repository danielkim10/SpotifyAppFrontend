import { createContext } from 'react';

import CurrentTrack from '../../interfaces/currentTrack';

interface Player {
    playbackTransferred: boolean,
    setPlaybackTransferred: (b: boolean) => void,
    currentTrack: CurrentTrack | null,
    setCurrentTrack: (c: CurrentTrack) => void
};

const player = {
    playbackTransferred: false,
    setPlaybackTransferred: (b: boolean) => null,
    currentTrack: null,
    setCurrentTrack: (c: CurrentTrack) => null
};

const PlayerContext = createContext<Player>(player);
export default PlayerContext;