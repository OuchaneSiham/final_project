import back from '../../assets/icons/back.png'
import { useState } from 'react';

function StatusIndicator({ isOnline = true }) {
    return (
        <div className="flex items-center gap-2">
            <span
                className={`w-3 h-3 rounded-full ${
                    isOnline ? "bg-green-500" : "bg-gray-400"
                }`}
            ></span>
            <span
                className={`text-sm font-medium ${
                    isOnline ? "text-green-600" : "text-gray-500"
                }`}
            >
                {isOnline ? "Online" : "Offline"}
            </span>
        </div>
    );
}


//temp send message
function SendMessageBar({ onSend }) {

    const [message, setMessage] = useState("");

    function handleSend() {
        if (!message.trim()) return;

        onSend?.(message);
        setMessage("");
    }

    return (
        <footer className="w-full  backdrop-blur-md flex items-center gap-2">

            {/* Input */}
            <input
                type="text"
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                className="flex-1 bg-stone-100 rounded-full px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-amber-500"
            />

            {/* Send Button */}
            <button
                onClick={handleSend}
                className="bg-amber-500 hover:bg-amber-600 active:scale-95 transition text-white px-4 py-2 rounded-full font-medium shadow"
            >
                Send
            </button>
        </footer>
    );
}

function MessageBubble({ message, isMe }) {
    return (
        <div className={`flex w-full ${isMe ? "justify-end" : "justify-start"}`}>
            
            <div
                className={`px-4 py-2 max-w-[80%] w-fit break-words shadow
                    ${isMe
                        ? "bg-blue-500 text-white rounded-2xl rounded-br-sm"
                        : "bg-[#E1D4C2] text-[#291C0E] rounded-2xl rounded-bl-sm"
                    }
                `}
            >
                {message}
            </div>

        </div>
    );
}


export default function Conversation()
{
    return(
        <div className="flex flex-col py-6 px-6 h-screen bg-gradient-to-br overflow-hidden from-[#3B2F2F] via-[#7E5C4A] to-[#F2D7B6] gap-1">
            {/* Header */}
            <header className="flex gap-4">
                <div className='flex items-center '>
                    <button className="rounded-full bg-white h-10 w-10 "
                            onClick={() => alert("back to list of chats")}>
                        <img src={back} alt="" className='w-full h-full text-black ' />
                    </button>
                </div>
                <div className='flex flex-col flex-1'>
                    <span className='tracking-wide  text-stone-100 text-[20px]'>ochangli</span>
                    <StatusIndicator/>
                </div>
            </header>


            <main className='flex flex-col flex-1 overflow-y-auto scrollbar-hide px-5 mt-3 mb-2 gap-[7px] '>

                <MessageBubble 
                    message={"Saved working directory and index state WIP on ResponiveChatUI: 58b2759 changing the styling , adding a new buttom bar but not working"}
                    isMe={false}
                />
                <MessageBubble 
                    message={"hello my friend "}
                    isMe={true}
                />
                            <MessageBubble 
                    message={"hello my friend "}
                    isMe={false}
                />
                            <MessageBubble 
                    message={"hello my friend "}
                    isMe={true}
                />
                <MessageBubble 
                    message={"hello my friend "}
                    isMe={false}
                />
                            <MessageBubble 
                    message={"hello my friend "}
                    isMe={true}
                />
                <MessageBubble 
                    message={"hello my friend "}
                    isMe={false}
                />
                <MessageBubble 
                    message={"hello my friend "}
                    isMe={false}
                />
                <MessageBubble 
                    message={"hello my friend "}
                    isMe={false}
                />
                <MessageBubble 
                    message={"hello my friend "}
                    isMe={false}
                />
                <MessageBubble 
                    message={"hello my friend "}
                    isMe={true}
                />
            </main>
        
        {/* The send message Input */}
            <SendMessageBar 
                onSend={() => alert("sending message")}/>
        </div>
    );
}