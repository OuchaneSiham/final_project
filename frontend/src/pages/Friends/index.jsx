import FriendBox from "../../components/friends/FriendBox";
import face from '../../assets/images/face.jpg';
import Navbar from "../../components/UI/NavBar";
import { useState } from 'react';
import { mockFriends } from './mockFriends.js';


export default function Friend()
{
    const [friends, setFriends] = useState(mockFriends);

    return (
        <div className="flex items-center flex-col min-h-screen bg-[#3E2522]/90 py-[5px] px-[10px] overflow-y-auto">
            <Navbar/>
            <p className="text-3xl font-bold text-amber-100 tracking-wide mb-6 drop-shadow-lg">
                Friends
            </p>
            <div className="flex flex-wrap justify-center gap-4">
                {friends.map((friend) =>(
                    <FriendBox userFace={friend.userFace}
                        userName={friend.userName}
                        status={friend.status}
                    />
                )
                )}
            </div>
        </div>
    );
}