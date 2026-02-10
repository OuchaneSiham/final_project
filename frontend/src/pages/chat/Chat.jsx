import Navbar from "../../components/UI/NavBar";
import { mockFriends } from "../Friends/mockFriends";
import { useState, useEffect } from 'react';
import FriendAvt from '../../components/chat/friendAvatar.jsx';
import Spiner from "../../components/UI/Spiner.jsx";
import { getContacts, getMessages } from "../../Services/chat/api.js";

export default function Chat()
{
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [friends, setFriends] = useState(mockFriends);
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    {/* A use effect for the contact side bar Runs only at the start */}
    useEffect( () =>
    {
        const loadSidebar = async () => {
        try {
            const data = await getContacts();
            setFriends(data);
            setLoading(false); // Stop loading once data is here
        }
        catch (error) {
            console.error("Failed to load contacts", error);
        }
    };
        loadSidebar();
    }, []);

    // --- EFFECT 2: Load Messages (Runs when activeChatId CHANGES) ---

    useEffect(() => {
        // If no user is selected yet, don't do anything
        if (!selectedUserId) return;

        const loadConversation = async () => {
        setMessages([]); // Optional: Clear old messages immediately so user doesn't see stale data
        const chatData = await getMessages(selectedUserId);
        setMessages(chatData);
        };

        loadConversation();
    }, [selectedUserId]); //

    return(
            <div className="flex flex-col items-center h-screen bg-gradient-to-br from-[#3B2F2F] via-[#7E5C4A] to-[#F2D7B6] py-4 gap-4 px-6">
                <Navbar/>
                <p className="text-3xl font-bold text-amber-100 tracking-wide mb-6 drop-shadow-lg">
                    Chat
                </p>
                {/* Global box chat container */}
                <div className="flex-1 flex gap-4 max-w-7xl w-full bg-gray-500  shadow-xl py-5 px-4 min-h-0">
                    
                    {/* side Bar*/}
                    <div className="flex flex-col items-center w-28 border-r bg-gradient-to-br from-rose-50 to-orange-50 p-4 gap-3 overflow-y-auto min-h-0">
                        {friends.map(
                            (user) => (
                                <FriendAvt onClick={() => setSelectedUserId(user.id)}
                                    key={user.id}        
                                    friend={user}/>
                            )
                        )}
                    </div>
                    {selectedUserId && (
                    <div className="flex flex-1 flex-col w-full bg-gray-200 rounded-2xl pt-6 min-h-0">
                        {/* Header section */}
                        <div className="flex items-center gap-3 px-6 py-4 pb-7 border-b border-red-400 flex-shrink-0">
                            <img 
                                src={friends[selectedUserId - 1].userFace}
                                alt={friends[selectedUserId - 1].userName}
                                className="w-14 h-14 rounded-full object-cover ring-2 ring-white"
                            />
                            <div className="flex-1">
                                <h3 className="text-white font-semibold text-lg">
                                    {friends[selectedUserId - 1].userName}
                                </h3>
                            </div>
                        </div>
                        {/* Messages Section */}
                        <div className="flex-1 bg-green-500 space-y-4 overflow-y-auto px-6 py-4 min-h-0">
                        </div>
                        <div className="px-6 py-4 bg-gray-600 border-t border-gray-400 flex items-center gap-3 flex-shrink-0">
                            <input type="text" placeholder="Type a message..." className="flex-1 px-4 py-3 rounded-full bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500"/>
                            <button className="w-12 h-12 rounded-full bg-amber-500 hover:bg-amber-600 text-white flex items-center justify-center transition-all hover:scale-105"></button>
                        </div>
                    </div>
                    )}
                    {/*Converstaion*/}
                </div>
            </div>
        );
}