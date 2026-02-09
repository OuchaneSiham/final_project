import Navbar from "../../components/UI/NavBar";
import { mockFriends } from "../Friends/mockFriends";
import { useState } from 'react';
import FriendAvt from '../../components/chat/friendAvatar.jsx';

// import ChatList from "../../components/chatSideBar/ChatList"; 
// import face from '../../assets/images/face.jpg'
// import Contacts from "../../components/chatSideBar/Contacts";

export default function Chat()
{
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [friends, setFriends] = useState(mockFriends);

    const handleUserClick = (user) => {
        setSelectedUserId(user.id);
        // Here you can also fetch messages for this user
        console.log(`Selected user: ${user.id}`);
      };
    return(
            <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-[#3B2F2F] via-[#7E5C4A] to-[#F2D7B6] py-4 gap-4 px-6">
                <Navbar/>
                <p className="text-3xl font-bold text-amber-100 tracking-wide mb-6 drop-shadow-lg">
                    Chat
                </p>
                {/* Global box chat container */}
                <div className="flex-1 flex max-w-7xl h-full w-full bg-gray-500 rounded-3xl shadow-xl py-5 px-4">
                    {/* side Bar*/}
                    <div className="flex flex-col items-center max-w-7xl w-24 border-r bg-gradient-to-br from-rose-50 to-orange-50 p-4 gap-3 overflow-y-auto rounded-2xl border-slate-300">
                        {friends.map(
                            (user) => (
                                <FriendAvt onClick={() => handleUserClick(user)}
                                            friend={user}/>
                            )
                        )}
                    </div>
                </div>
            </div>
        );
}