import Logo from "./Logo";
import ProfileIcone from "./ProfileIcone";
import NotifIcone from "./NotifIcone";


export default function Navbar()
{
    return (
        <nav className="flex items-center justify-between w-full p-5 h-20 border mt-[3] rounded-[19px] border-[#C77966]/20 bg-[#4A302A] mb-8 ">
            <div className="flex-1"/>
            <Logo variant ='Logo'/>
            <div class="flex-1 flex justify-end items-center gap-9">
                <NotifIcone />
                <ProfileIcone />
            </div>
        </nav>
    );
}