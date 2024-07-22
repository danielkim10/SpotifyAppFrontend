import Playlist from '../../../interfaces/playlist';

export const sortPlaylists = (a: Playlist, b: Playlist, asc: boolean, field: string) => {
    const ascending = asc ? 1 : -1;

    switch (field) {
        case "name":
            return a.name.toLowerCase() < b.name.toLowerCase() ? 1 * ascending : -1 * ascending;
        case "owner":
            return a.owner.name.toLowerCase() < b.owner.name.toLowerCase() ? 1 * ascending : -1 * ascending;
        case "tracks":
            return a.tracks < b.tracks ? 1 * ascending : -1 * ascending;
        case "updated":
            return a.updatedAt < b.updatedAt ? 1 * ascending : -1 * ascending;
        case "downloaded":
            return a.updatedAt < b.updatedAt ? 1 * ascending : -1 * ascending;
        default:
            return 1;
    }
}