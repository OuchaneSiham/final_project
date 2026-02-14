import Navbar from "../../components/UI/NavBar";
import { mockFriends } from "../Friends/mockFriends";
import { useState } from 'react';
import FriendAvt from '../../components/chat/friendAvatar.jsx';

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
export default function Chat()
{
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [friends, setFriends] = useState(mockFriends);

    console.log(selectedUserId);
    return(
            <div className="flex flex-col h-screen bg-gradient-to-br from-[#3B2F2F] via-[#7E5C4A] to-[#F2D7B6]">
               
            </div>
        );
}