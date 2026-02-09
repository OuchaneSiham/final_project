import chatIcone from '../../assets/icons/chatIcone.png'
import face from '../../assets/images/face.jpg';
import Contacts from './Contacts';

export default function ChatList()
{
    return(
        <div className="flex flex-col w-[350px] rounded-3xl gap-5">
            {/* top chat Bar */}
                 
            <div className="flex items-center justify-start w-auto h-[92px] bg-blue-200 rounded-l-2xl rounded-t-2xl p-4 gap-4">
                <div className='h-11 w-11 rounded-full transition duration-350 ease-in-out overflow-hidden'>
                    <img   src={face}
                            alt="testing img"
                            className='h-full w-full object-cover'>
                    </img>
                </ div>
                <p className='text-[22px] Semi-bold text-[#1A1A1A]'>
                    Chats
                </p>
            </div>

            {/* Converstaions */}
            <div className='flex-1 flex flex-col bg-white rounded-b-3xl rounded-r-3xl p-[16px] gap-2'>
            
            </div>
        </div>
    );
}