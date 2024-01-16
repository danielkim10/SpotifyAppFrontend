import Playlist from "../interfaces/playlist";
import RoomMember from "../interfaces/roommember";
import Track from "../interfaces/track";

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

export const sortRoomByName = (a: RoomMember, b: RoomMember, asc: boolean) => {
    return 1;
}

export const sortRoomByOwner = (a: RoomMember, b: RoomMember, asc: boolean) => {
    return 1;
}

export const sortRoomByLastAccessed = (a: RoomMember, b: RoomMember, asc: boolean) => {
    return 1;
}

export const sortRoomByCreated = (a: RoomMember, b: RoomMember, asc: boolean) => {
    return 1;
}