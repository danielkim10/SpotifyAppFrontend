import Playlist from '../interfaces/playlist';
import Member from '../interfaces/member';
import Track from '../interfaces/track';

export const sortPlaylistByName = (a: Playlist, b: Playlist, asc: boolean) => {
    const ascending = asc ? 1 : -1;
    return a.name > b.name ? 1 * ascending : -1 * ascending;
}

export const sortPlaylistByOwner = (a: Playlist, b: Playlist, asc: boolean) => {
    const ascending = asc ? 1 : -1;
    return a.owner.display_name > b.owner.display_name ? 1 * ascending : -1 * ascending;
}

export const sortTrackByName = (a: Track, b: Track, asc: boolean) => {
    return 1;
}

export const sortTracksByAlbum = (a: Track, b: Track, asc: boolean) => {
    return 1;
}

export const sortRoomByName = (a: Member, b: Member, asc: boolean) => {
    const ascending = asc ? 1 : -1;
    return a.room.name > b.room.name ?  1 * ascending : -1 * ascending;
}

export const sortRoomByOwner = (a: Member, b: Member, asc: boolean) => {
    return 1;
}

export const sortRoomByLastAccessed = (a: Member, b: Member, asc: boolean) => {
    return 1;
}

export const sortRoomByCreated = (a: Member, b: Member, asc: boolean) => {
    return 1;
}