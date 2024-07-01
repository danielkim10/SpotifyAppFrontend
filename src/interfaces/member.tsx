import Room from './room';
import User from './user';

interface Member {
    _id: string,
    room: Room,
    createdAt: Date,
    updatedAt: Date,
    user: User
}

export default Member;