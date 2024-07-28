import ChatMessage from './ChatMessage';
import MessageEvent from '../../../interfaces/MessageEvent';

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