import Logo from "./Logo";
import ProfileIcone from "./ProfileIcone";
import NotifIcone from "./NotifIcone";
import { useState, useEffect } from 'react';


export default function Navbar()
{
    // const [hasNotification , setHasNotification] = useState(false);
    return (
        <nav className="flex items-center justify-between w-full p-5 h-20 border mt-[3] rounded-[19px] border-[#C77966]/20 bg-[#4A302A] mb-8 ">
            <div className="flex-1"/>
            <Logo variant ='Logo'/>
            <div className="flex-1 flex justify-end items-center gap-9">
                <NotifIcone Notificationstate={false}/>
                <ProfileIcone />
            </div>
        </nav>
    );
}