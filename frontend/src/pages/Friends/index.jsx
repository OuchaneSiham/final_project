import FriendBox from "../../components/friends/FriendBox";
import face from '../../assets/images/face.jpg';
import Navbar from "../../components/UI/NavBar";

export default function Friend()
{
    return (
        <div className="flex items-center flex-col h-screen bg-[#3E2522]/90 py-[5px] px-[10px]">
            <Navbar/>
            <p className="text-3xl font-bold text-amber-100 tracking-wide mb-6 drop-shadow-lg">
                Friends
            </p>
            <div className="flex flex-wrap gap-4">
                <FriendBox userFace={face} status={"offline"}  userName="Ochangli"/>
                {/* <FriendBox userFace={face} status={"offline"}  userName="ohmane"/> */}
                {/* <FriendBox userFace={face} status={"offline"}  userName="ohmane"/> */}

            </div>
        </div>
    );
}