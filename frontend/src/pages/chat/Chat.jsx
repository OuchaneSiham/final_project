import Navbar from "../../components/UI/NavBar";
import { useState } from 'react';
import FriendAvt from '../../components/chat/friendAvatar.jsx';
import { Mockfriends } from "./Mockfriends.js";
import { useLocation } from 'react-router-dom';
import { MOCK_MESSAGES } from "./MockMessages.js";
// import ChatList from "../../components/chatSideBar/ChatList"; 
// import face from '../../assets/images/face.jpg'
// import Contacts from "../../components/chatSideBar/Contacts";

// export default function Sidebar() {
//     const users = Array.from({ length: 20 })
  
//     return (
//       <div className="h-screen w-24 bg-[#1f1f1f] flex flex-col items-center py-4">
        
//         {/* Scrollable container */}
//         <div className="flex-1 w-full overflow-y-auto space-y-4 px-2 scrollbar-thin scrollbar-thumb-gray-600">
//           {users.map((_, i) => (
//             <img
//               key={i}
//               src="https://i.pravatar.cc/100"
//               alt="avatar"
//               className="w-14 h-14 rounded-full object-cover mx-auto cursor-pointer hover:scale-105 transition"
//             />
//           ))}
//         </div>
  
//       </div>
//     )
//   }


//This component for the Chat Header --- Mobile Devoces --- 
function ChatHeader()
{
    return(
        <header className="tracking-wide border-amber-700/30 text-stone-100 w-full text-[42px] px-4 py-4">
            Messages
        </header>
    );
}

//The ChatList --- Mobile Devices 
//The friend message Box
function ChatBox({friends, onSelectConv})
{   
    return(
        <button className="flex items-start w-full px-2 py-1 border-[0.5px] rounded-2xl gap-0.5 bg-[#E1D4C2]/20" 
                onClick={onSelectConv}>
                
            <div className="py-1">
                <img src={friends.avatar}
                        alt={`${friends.userName} avatar`}
                        className="w-17 h-17 rounded-full overflow-hidden shadow-lg"/>
            </div>
            <div className="flex-1 h-full flex flex-col items-start py-2 px-4 gap-1">
                <span className="font-semibold text-base text-[#291C0E]">{friends.username}</span>
                <span className="font-normal text-xs text-[#291C0E]/60 line-clamp-1">{friends.lastMessage}</span>
            </div>
            <div className="text-sm py-2">
                {friends.time}
            </div>
        </button>
    );
}

function ChatList({friends, onSelectCon})
{
    return (
        <div className="flex flex-col gap-y-[3px] flex-1 p-4 pb-15 overflow-y-auto scrollbar-hide">
            {friends.map((friend) => (
                <ChatBox key={friend.id} friends={friend} onClick={onSelectCon}/>
            ))}
        </div>
    );
}

function BottomBar()
{
    return(
        <footer className="fixed z-10 bottom-3 left-0 right-0 bg-[#E1D4C2]/60 backdrop-blur-sm rounded-3xl border-t border-black/10 mx-3 ">
            {/* Add your bottom bar content here */}
            <div className="h-11 w-full bg-[#7E5C4A]/30 rounded-full flex items-center justify-around">
                {/* Add icons/buttons here */}
            </div>
        </footer>
    );
}

//The Component that show the messages;
// friend , object with friend data , 
// messages : Array of messages Objects
// onSend Message: call Back to handlle messages sending;

function Conversation({ friend, onSendMessage, onBack })
{
    return(
        <div className="h-screen w-full bg-white">

        </div>
    );
}

export default function Chat()
{
    const [friends, setFriends] = useState(Mockfriends);
    const [conversations, setConversations] = useState([]);
    const [selectedConv, setSelectedConv] = useState(null);
    const [messages, setMessages] = useState(MOCK_MESSAGES); // all the message (me and the sender )
    const [input, setInput] = useState(""); // what i sent
    const [blockedUsers, setBlockedUsers] = useState([]);

    const location = useLocation();
    console.log(location);
    return (
        <div className="h-screen w-full">
            {selectedConv ? (
                <Conversation
                    friend={selectedConv}

                    onBack={setSelectedConv(null)}
                />
            ) : (
                <div className="flex flex-col h-screen bg-gradient-to-br overflow-hidden from-[#3B2F2F] via-[#7E5C4A] to-[#F2D7B6]">
                    <ChatHeader />
                    <div className="flex-1 overflow-hidden relative overflow-y-auto scrollbar-hide">
                        <ChatList
                            friends={friends}
                            onSelectCon={setSelectedConv}
                        />
                        <BottomBar />
                    </div>
                </div>
            )}
        </div>
    );
}