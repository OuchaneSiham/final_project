import face from '../../assets/images/face.jpg'

export default function ProfileHead({user})
{
    return(
        <div className="w-full bg-gradient-to-r from-purple-200 to-purple-300 h-[20%] flex flex-row justify-between items-center gap-4 rounded-3xl p-5">
            <div className="flex items-center gap-4">
                <div className='relative h-23 w-23 rounded-full ease-in-out overflow-hidden '>
                    <div>
                        <img   src={face}
                                alt="user face"
                                className='h-full w-full object-cover'>
                        </img>
                    </div>
                </div>
                <p className='text-3xl font-bold text-gray-900'>
                    ochangli
                </p>
            </div>
        </div>
    );
}