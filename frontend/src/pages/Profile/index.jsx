import Navbar from "../../components/UI/NavBar";
import ProfileHead from "../../components/Profile/ProfileHeader";
import ProfileStatistics from "../../components/Profile/ProfileStatistics";
import PersonlInfos from "../../components/Profile/PersonlInfos";
import { mockFriends } from "./mockFriends";
import FriendBox from "../../components/Profile/FriendBox";
import { useState } from "react";
import ProfileCard from "../../components/Profile/ProfileCard";
import ProfileEdit from "../../components/Profile/ProfileEdit";
export default function Profile()
{

    const [friends, setFriends] = useState(mockFriends);
    const [friendSeleted, setfriendSeleted] = useState(null);
    const [updatedData, setUpdatedData] = useState({});
    const [isEdit, setEdit] = useState(false); // The user trigger the Edit Profile button.

    return(
        <div className="flex items-center h-screen flex-col h-screen bg-[#3E2522]/90 py-[5px] px-[20px]">
            <Navbar/>
            <p className="text-3xl font-bold text-amber-100 tracking-wide mb-6 drop-shadow-lg">
                Profile
            </p>
            {/* rendring the Edit card if it is clicked */}
            {isEdit && (
                
                <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                        <ProfileEdit />
                </div>)}

            <div className="flex flex-row flex-1  bg-[#3E2522]/90 rounded-2xl w-full gap-x-[9px] p-3 min-h-0">
                {/* left side profile*/}
                <aside className="flex flex-col w-3/4 space-y-2 flex-1 bg-white rounded-3xl bg-gradient-to-br from-[#b67a49] via-[#cfa46d] to-[#e6e3a3 space-y-">
                    <ProfileHead />
                    <PersonlInfos onEditClick={() => setEdit(true)}/>
                    <ProfileStatistics />
                </aside>
                {/* right side for friends*/}
                <aside className="flex flex-col h-full w-1/4 bg-white rounded-2xl overflow-y-auto min-h-0 space-y-3">
                    {/* For pending requests */}
                    
                    <div className="flex flex-col h-2/3 bg-yellow-100 items-center py-4 overflow-y-auto min-h-0">
                    {friendSeleted && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                            <div 
                                className="absolute inset-0" 
                                onClick={() => setEdit(null)}>
                            </div>
                            <div className="relative z-10 w-full max-w-lg"> 
                                <ProfileEdit
                                    friend={friendSeleted} 
                                    onClose={() => setEdit(null)} 
                                />
                            </div>
                        </div>)}
                        <h3>Friends</h3>
                        {/* {friends.map((friend) =>(
                            <FriendBox
                                key={friend.id}
                                friend={friend}
                                onClick={() => setfriendSeleted(friend)}
                            />)
                        )} */}
                    </div>
                    {/* For Friends */}
                    <div className="flex flex-col h-1/3 bg-yellow-100 items-center py-4 ">
                        <h3>Pending Requests</h3>
                    </div>
                </aside>
            </div>
        </div>
    );
}