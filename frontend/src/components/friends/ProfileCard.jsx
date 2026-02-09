import close from '../../assets/icons/close.png'
import StatBox from './StatBox'

export default function ProfileCard({friend, onClose})
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
    return(
        <div className="relative  w-[90%] rounded-3xl min-h-[300px] min-w-[500px] mx-auto max-w-[650px] bg-[#FFF2DF] px-10 py-4">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 h-28 w-28 z-10">
                <div className='h-full w-full rounded-full overflow-hidden border-4 border-white shadow-lg'>
                    <img   src={friend.userFace}
                        alt="User profile image"
                        className='h-full w-full object-cover'>
                    </img>
                </div>
                {/* close buttn */}
                <div className={`absolute ${getStatusColor()} h-5 w-5 rounded-full border-2 border-white bottom-1 right-2`}>
                </div>
            </div>
            <button className="hover:bg-amber-200/50 absolute h-12 w-12 top-4 right-4 rounded-full z-20" onClick={onClose}>
                    <img   src={close}
                        alt="red close button"
                        className='h-full w-full object-cover'>
                    </img>
                </button>
            <div>
                <p className="text-3xl font-bold text-amber-900 text-center pt-15 pb-10 mb-2 tracking-wide">
                    {friend.userName}
                </p>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <StatBox label='Wins' value={friend.wins}/>
                <StatBox label='Match Played' value={friend.MatchPlaye}/>
                <StatBox label='Loses' value={friend.Loses}/>
                <StatBox label='Wins Rate' value={`${(10 / 10) * 100}%`}/>
            </div>
        </div>
    );
}