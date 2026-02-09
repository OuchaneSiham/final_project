import FriendBox from "../../components/friends/FriendBox";
import ProfileCard from "../../components/friends/ProfileCard.jsx";
import Navbar from '../../components/UI/NavBar';
import { useState } from 'react';
import { mockFriends } from './mockFriends.js';


export default function Friend()
{
    const [friends, setFriends] = useState(mockFriends);
    const [friendSeleted, setfriendSeleted] = useState(null);


    return (
        <div className="flex items-center flex-col min-h-screen bg-[#3E2522]/90 py-[5px] px-[20px] overflow-y-auto">
            <Navbar/>
            <p className="text-3xl font-bold text-amber-100 tracking-wide mb-6 drop-shadow-lg">
                Friends
            </p>
            {/* rendring the friend card if it is delected */}
            {friendSeleted && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div 
                        className="absolute inset-0" 
                        onClick={() => setfriendSeleted(null)}>
                    </div>
                    <div className="relative z-10 w-full max-w-lg"> 
                        <ProfileCard 
                            friend={friendSeleted} 
                            onClose={() => setfriendSeleted(null)} 
                        />
                    </div>
                </div>)}
            
            <div className="flex flex-wrap justify-center gap-4">
                {friends.map((friend) =>(
                    <FriendBox
                        key={friend.id}
                        friend={friend}
                        onClick={() => setfriendSeleted(friend)}
                    />
                )
                )}
            </div>
        </div>
    );
}