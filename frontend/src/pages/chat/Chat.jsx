import Navbar from "../../components/UI/NavBar";
import { useState } from 'react';
import FriendAvt from '../../components/chat/friendAvatar.jsx';
import { Mockfriends } from "./Mockfriends.js";

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
        <header className="tracking-wide border-amber-700/30 text-stone-100 w-full text-[52px] px-4 py-4">
            Chat
        </header>
    );
}

//The ChatList --- Mobile Devices 
//The friend message Box
function ChatBox({friends})
{   

    return(
        <button className="flex items-start w-full px-2 py-1">
                

            <div className="py-1">
                <img src={friends.avatar}
                        alt={`${friends.userName} avatar`}
                        className="w-17 h-17 rounded-full overflow-hidden shadow-lg"/>
            </div>
            <div className="flex-1 border-b-1 h-full flex flex-col items-start px-4 gap-1">
                <span className="font-semibold text-base text-[#291C0E] ">{friends.username}</span>
                <span className="font-normal text-xs text-[#291C0E]/60 line-clamp-1 ">This is the last dfd jkhdfjkd fhdfjkdhf message</span>
            </div>
            <div className="text-sm py-2">
                {friends.time}
            </div>
        </button>
    );
}

function ChatList({friends})
{
    return (
        <main className="flex flex-col bg-[#E1D4C2] border-1 p-4 rounded-t-4xl flex-1 shadow-xl overflow-y-auto scrollbar-hide">
            {friends.map((friend) => (
                
                <ChatBox key={friend.id} friends={friend}/>
            ))}

        </main>
    );
}

export default function Chat()
{
    // const [selectedUserId, setSelectedUserId] = useState(null);
    const [friends, setFriends] = useState(Mockfriends);

    return(
            <div className="flex flex-col h-screen bg-gradient-to-br from-[#3B2F2F] via-[#7E5C4A] to-[#F2D7B6]">
               <ChatHeader />
               <ChatList friends={friends}/>
               
            </div>
        );
}