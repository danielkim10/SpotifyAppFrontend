import Track from '../../../interfaces/track';

export const sortTracks = (a: Track, b: Track, asc: boolean, field: string) => {
    const ascending = asc ? 1 : -1;

    switch (field) {
        case "name":
            return a.name.toLowerCase() > b.name.toLowerCase() ? 1 * ascending : -1 * ascending;
        case "artist":
            return a.artists[0].name.toLowerCase() > b.artists[0].name.toLowerCase() ? 1 * ascending : -1 * ascending;
        case "album":
            return a.album.name.toLowerCase() > b.album.name.toLowerCase() ? 1 * ascending : -1 * ascending;
        case "added":
            return a.duration_ms > b.duration_ms ? 1 * ascending : -1 * ascending;
        case "duration":
            return a.duration_ms > b.duration_ms ? 1 * ascending : -1 * ascending;
        default:
            return 1;
    }

}