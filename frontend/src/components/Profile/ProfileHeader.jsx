import { useState } from 'react';
import backArrow from '../../Assets/icons/backArrow.png'
import face from '../../Assets/images/face.jpg'
import ProfileDropdown from './ProfileDropdown'



export default function ProfileHeader({userAvatar, handlleLogout})
{
    //DropDown state;
    const [isDropdownOpen, setisDropdownOpen] = useState(false);
    return(

        //This is for the search Bar !!
        
        <header className="flex justify-between items-center  w-full h-[60px] py-[8px] px-[12px]">
            <button type="button" className='w-[28px] h-[28px] opacity-100 hover:opacity-70 border-1 transition-opacity duration-300'>
                <img src={backArrow} alt="back arrow" />
            </button>
            <div className='text-[#F0F0F0] text-[20px] font-semibold tracking-tight'>
                My Profile
            </div>

            {/* drop Down */}
            <div className='relative'>
                <button type='button'
                        className='relative cursor-pointer border-[#FFFFFF4D] border-[2px] rounded-full w-[36px] h-[36px] ease-in-out overflow-hidden '
                        onClick={() => setisDropdownOpen(prev => !prev)}
                >
                    <img src={userAvatar}
                            alt="the user avatar"
                            className='w-full h-full object-cover'
                    />
                </button>

                        {isDropdownOpen && (
                                <ProfileDropdown handleLogout={handlleLogout}/>
                            )
                        }
            </div>
        </header>
    );
}