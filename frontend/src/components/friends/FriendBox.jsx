import userIcone from '../../assets/icons/user.svg';
import StatusIndicator from '../UI/StatusIndicator';

export default function FriendBox({friend, onClick})
{
    const getStatusColor = () => {
            switch(friend.status) {
                case 'online':
                    return 'bg-green-500';
                case 'offline':
                    return 'bg-gray-400';
                default:
                    return 'bg-gray-400';
            }
        };
    return (
        <li className="relative flex p-5 border-2 border-purple-500/30 gap-4 drop-shadow-md items-center h-[84px] min-w-[400px]  bg-amber-900/40 border rounded-3xl border border-slate-600/50 hover:border-slate-500 transition-all">
            {/* for the image and the status */}
            <div className='relative h-15 w-15' >
                <div className='relative h-15 w-15 rounded-full ease-in-out overflow-hidden '>
                    <div>
                        <img   src={friend.userFace}
                                alt="user face"
                                className='h-full w-full object-cover'>
                        </img>
                    </div>
                </div>
            <StatusIndicator getStatusColor={getStatusColor}/>
            <div className={`absolute ${getStatusColor()} z-10 h-4 w-4 rounded-full border-2 border-[#3E3D38] bottom-0 right-0`}>
            </div>
            </div>
            {/*For the user name*/}
            <p className='text-orange-200 font-bold text-xl tracking-wide'>
                {friend.userName}
            </p>
            {/*For visit Profile botton*/}
            <button className='ml-auto rounded-full p-2 transition' onClick={onClick}>
                <img src={userIcone} alt="Profile access icone"
                        />
            </button>
        </li>
    );
}