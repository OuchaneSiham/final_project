import chatIcone from '/Users/ochangli/Desktop/tictactoe/frontend/src/assets/icons/chatIcone.png';
import face from '/Users/ochangli/Desktop/tictactoe/frontend/src/assets/images/face.jpg';

export default function ChatList()
{
    return(
        <div className="flex flex-col w-1/5 bg-gray-200 rounded-2xl p-2 ">
            {/* top chat Bar */}              
            <div className="flex items-center justify-start w-auto h-[72px] rounded-2xl p-4 gap-4">
                <div className='h-11 w-11 rounded-full transition duration-350 ease-in-out overflow-hidden'>
                    <img   src={face}
                            alt="testing img"
                            className='h-full w-full object-cover'>
                    </img>
                </ div>
                <p className='text-[30px] Semi-bold text-[#1A1A1A]'>
                    Chats
                </p>
            </div>
            {/* search Bar */}       
        </div>
    );
}