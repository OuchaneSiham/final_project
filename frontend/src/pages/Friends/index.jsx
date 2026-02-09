import FriendBox from "../../components/friends/FriendBox";
import ProfileCard from "../../components/friends/ProfileCard.jsx";
import Navbar from "../../components/UI/NavBar";
import { useState } from 'react';
import { mockFriends } from './mockFriends.js';


export default function Friend()
{
    const [friends, setFriends] = useState(mockFriends);
    const [friendSeleted, setfriendSeleted] = useState(true);

    const handleViewProfile = (friend) =>
    {

    }
    return (
        <div className="flex items-center flex-col min-h-screen bg-[#3E2522]/90 py-[5px] px-[20px] overflow-y-auto">
            <Navbar/>
            <p className="text-3xl font-bold text-amber-100 tracking-wide mb-6 drop-shadow-lg">
                Friends
            </p>
            {/* rendring the friend card if it is delected */}
            {friendSeleted && <ProfileCard 
                />}
            {/* Friend infos compo
            <div className="flex flex-wrap justify-center gap-4">
                {friends.map((friend) =>(
                    <FriendBox userFace={friend.userFace}
                        userName={friend.userName}
                        status={friend.status}
                        onClick={() => {alert("hello")}} 
                    />
                )
                )}
            </div> */}
        </div>
    );
}