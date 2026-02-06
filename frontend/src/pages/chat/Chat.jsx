import Navbar from "../../components/UI/NavBar";
import ChatList from "../../components/chatSideBar/ChatList"; 

export default function Chat()
{
    return(
        <div className="flex flex-col h-screen bg-[#3E2522]/90 py-[5px] px-[10px]">
            < Navbar />
            <div className="flex flex-1 rounded-2xl gap-4">
                <ChatList />
                <div className="w-4/5 bg-red-300  rounded-2xl">

                </div>
            </div>

        </div>
    );
}