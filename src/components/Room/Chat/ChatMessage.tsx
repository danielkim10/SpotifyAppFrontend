import Avatar from '@mui/material/Avatar';

interface MessageEvent {
    text: string,
    socketID: string,
    userID: string,
    name: string,
    imageURL: string,
    timestamp: Date
}

const ChatMessage = (props: {message: MessageEvent}) => {
    const { message } = props;

    return (
        <li className="w-full h-auto overflow-auto">
            <div className="flex w-auto p-2">
                {
                    message.imageURL === "" ? <Avatar alt={message.name}>{message.name.slice(0,1)}</Avatar>
                    :
                    <Avatar alt={message.name} src={message.imageURL}/>
                }
                <b className="flex mx-2 my-auto">{message.name}</b>
            </div>
            <div className="float-left p-2">
                <p className="w-full">{message.text}</p>
            </div>
        </li>
    );
}

export default ChatMessage;