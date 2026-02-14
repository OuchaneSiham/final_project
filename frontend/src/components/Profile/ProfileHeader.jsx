import backArrow from '../../Assets/icons/backArrow.png'
import face from '../../Assets/images/face.jpg'

export default function ProfileHeader()
{
    return(
        <header className="flex justify-between items-center  w-full h-[60px] py-[8px] px-[12px]">
            <button type="button" className='w-[28px] h-[28px] opacity-100 hover:opacity-70 transition-opacity duration-300'>
                <img src={backArrow} alt="back arrow" />
            </button>
            <div className='text-[#F0F0F0] text-[20px] font-semibold tracking-tight'>
                My Profile
            </div>

            {/* drop Down */}
            <button type='button' className='cursor-pointer border-[#FFFFFF4D] border-[2px] rounded-full w-[36px] h-[36px] ease-in-out overflow-hidden '>
                <img src={face}
                        alt="the user avatar"
                        className='w-full h-full object-cover'/>
            </button>
        </header>
    );
}