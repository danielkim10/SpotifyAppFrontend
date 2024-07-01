import User from './user';

interface Room {
    _id: string,
    owner: User,
    name: string,
    description: string,
    password: string
};

export default Room;