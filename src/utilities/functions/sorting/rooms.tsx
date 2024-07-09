import Member from '../../../interfaces/member';

export const sortRooms = (a: Member, b: Member, asc: boolean, field: string) => {
    const ascending = asc ? 1 : -1;

    switch (field) {
        case "name":
            return a.room.name.toLowerCase() > b.room.name.toLowerCase() ? 1 * ascending : -1 * ascending;
        case "owner":
            return a.user.name.toLowerCase() > b.user.name.toLowerCase() ? 1 * ascending: -1 * ascending;
        case "lastAccessed":
            return a.updatedAt > b.updatedAt ? 1 * ascending: -1 * ascending;
        case "createdAt":
            return a.createdAt > b.createdAt ? 1 * ascending: -1 * ascending;
        default:
            return 1;
    }
}