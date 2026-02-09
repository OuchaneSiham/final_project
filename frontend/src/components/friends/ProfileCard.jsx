

export default function ProfileCard({friendAvatar = 'https://i.pravatar.cc/150?img=1', friendMath=4 , friendWins=30 , friendLoses=2 ,friendNmae="Ochangli" , onClose})
{
    return(
        <div className="relative  w-[90%] rounded-3xl h-[300px] min-w-[500px] mx-auto max-w-[650px] bg-[#FFF2DF] ">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 h-28 w-28 z-10">
                <div className='h-full w-full rounded-full overflow-hidden border-4 border-white shadow-lg'>
                    <img   src={friendAvatar}
                        alt="User profile image"
                        className='h-full w-full object-cover'>
                    </img>
                </div>
                <div className="absolute bg-green-500 h-5 w-5 rounded-full border-2 border-white bottom-0 right-0">
                </div>
            </div>
            <div>
                <p className="text-3xl font-bold text-amber-900 text-center pt-20 mb-2 tracking-wide">
                    {friendNmae}
                </p>
            </div>
        </div>
    );
}