// mui components
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
        <div>
            <div>
                {
                    message.imageURL === "" ? <Avatar alt={message.name}>{message.name.slice(0,1)}</Avatar>
                    :
                    <Avatar alt={message.name} src={message.imageURL}/>
                }
                {message.name}
            </div>
            <div>
                {message.text}
            </div>
        </div>
    );
}

export default ChatMessage;