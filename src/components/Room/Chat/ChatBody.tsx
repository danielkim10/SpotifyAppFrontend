import ChatMessage from './ChatMessage';

interface MessageEvent {
    text: string,
    socketID: string,
    userID: string,
    name: string,
    imageURL: string,
    timestamp: Date
}

const ChatBody = (props: {messages: MessageEvent[]}) => {
    const { messages } = props;

    return (
        <ul className="w-full flex-auto bg-black overflow-y-scroll">
            {
                messages.map(m => {
                    return <ChatMessage message={m} />
                })
            }
        </ul>
    );
}

export default ChatBody;