import Playlist from '../../../interfaces/playlist';

export const sortPlaylistsByName = (a: Playlist, b: Playlist, asc: boolean) => {
    const ascending = asc ? 1 : -1;
    return a.name > b.name ? 1 * ascending : -1 * ascending;
}

export const sortPlaylistsByOwner = (a: Playlist, b: Playlist, asc: boolean) => {
    const ascending = asc ? 1 : -1;
    return a.owner.display_name > b.owner.display_name ? 1 * ascending : -1 * ascending;
}