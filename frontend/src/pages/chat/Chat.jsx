import Navbar from "../../components/UI/NavBar";
import { mockFriends } from "../Friends/mockFriends";
import { useState } from 'react';
import FriendAvt from '../../components/chat/friendAvatar.jsx';

// import ChatList from "../../components/chatSideBar/ChatList"; 
// import face from '../../assets/images/face.jpg'
// import Contacts from "../../components/chatSideBar/Contacts";

export default function Chat()
{
    const [selectedUserId, setSelectedUserId] = useState(0);
    const [friends, setFriends] = useState(mockFriends);

    console.log(selectedUserId);
    return(
            <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-[#3B2F2F] via-[#7E5C4A] to-[#F2D7B6] py-4 gap-4 px-6">
                <Navbar/>
                <p className="text-3xl font-bold text-amber-100 tracking-wide mb-6 drop-shadow-lg">
                    Chat
                </p>
                {/* Global box chat container */}
                <div className="flex-1 flex gap-4 max-w-7xl h-full w-full bg-gray-500 rounded-3xl shadow-xl py-5 px-4">
                    
                    {/* side Bar*/}
                    <div className="flex flex-col items-center max-w-7xl w-24 border-r bg-gradient-to-br from-rose-50 to-orange-50 p-4 gap-3 overflow-y-auto rounded-2xl border-slate-300">
                        {friends.map(
                            (user) => (
                                <FriendAvt onClick={() => setSelectedUserId(user.id)}
                                    key={user.id}        
                                    friend={user}/>
                            )
                        )}
                    </div>

                     {/*Converstaion*/}
                    <div className="flex flex-1 flex-col w-full bg-gray-200 rounded-2xl pt-6">
                        {/* Header section */}
                        <div className=" flex items-center gap-3 px-6 py-4 pb-7 border-b  border-red-400">
                            <img 
                                src={friends[selectedUserId].userFace}
                                alt={friends[selectedUserId].userName}
                                className="w-14 h-14 rounded-full object-cover ring-2 ring-white"
                            />
                            <div className="flex-1">
                                <h3 className="text-white font-semibold text-lg">
                                    {friends[selectedUserId].userName}
                                </h3>
                            </div>
                        </div>
                        {/* Messages Section */}
                        <div className="flex-1 bg-green-500 space-y-4 overflow-y-auto px-6 py-4 ">
                        </div>
                        <div className="px-6 py-4 bg-gray-600 border-t border-gray-400 flex items-center gap-3">
                            <input type="text" placeholder="Type a message..."className=" flex-1 px-4 py-3 rounded-full bg-gray-700 text-white placeholder-gray-400focus:outline-none focus:ring-2 focus:ring-amber-500"/>
                            <button className="w-12 h-12 rounded-full bg-amber-500 hover:bg-amber-600 text-white flex items-center justify-centertransition-allhover:scale-105"></button>
                        </div>
                    </div>
                </div>
            </div>
        );
}