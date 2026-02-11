import Navbar from "../../components/UI/NavBar";
import ProfileHead from "../../components/Profile/ProfileHeader";
export default function Profile()
{
    return(
        <div className="flex items-center h-screen flex-col h-screen bg-[#3E2522]/90 py-[5px] px-[20px]">
            <Navbar/>
            <p className="text-3xl font-bold text-amber-100 tracking-wide mb-6 drop-shadow-lg">
                Profile
            </p>

            <div className="flex flex-row flex-1  bg-[#3E2522]/90 rounded-2xl w-full gap-x-[9px] p-3">
                {/* left side profile*/}
                <aside className="w-3/4 flex-1 bg-white rounded-3xl bg-gradient-to-br from-[#b67a49] via-[#cfa46d] to-[#e6e3a3]">
                    <ProfileHead />
                </aside>
                {/* right side for friends*/}
                <aside className="w-1/4 bg-white rounded-2xl">

                </aside>
            </div>
        </div>
    );
}