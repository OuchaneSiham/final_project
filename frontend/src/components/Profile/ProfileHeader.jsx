import { useState } from 'react';
import backArrow from '../../Assets/icons/backArrow.png'
import face from '../../Assets/images/face.jpg'
import ProfileDropdown from './ProfileDropdown'
import { RiDashboardHorizontalLine } from "react-icons/ri";
import { PiSignOutBold } from "react-icons/pi";


export default function ProfileHeader()
{
    //DropDown state;
    const [isDropdownOpen, setisDropdownOpen] = useState(true);
    return(
        <header className="flex justify-between items-center  w-full h-[60px] py-[8px] px-[12px]">
            <button type="button" className='w-[28px] h-[28px] opacity-100 hover:opacity-70 transition-opacity duration-300'>
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
                    <img src={face}
                            alt="the user avatar"
                            className='w-full h-full object-cover'
                    />
                </button>

                        {isDropdownOpen && (
                            <div className=' z-100 flex flex-col shadow-lg justify-center items-center absolute top-[100%] rounded-[12px] right-[50%] mt-[8px] bg-[#162D2A] w-[180px] border-[1px] border-[1px] border-[#FFFFFF26]'>
                                <button type="button" className=' flex gap-2 cursor-pointer w-full inline-flex items-center h-[48px] px-[22px] p-[12px]'>
                                    <RiDashboardHorizontalLine className="h-[20px] w-[20px] text-[#FFFFFF]"/>
                                    <p className='text-[#FFFFFF]'>
                                        Dashboard
                                    </p>
                                </button>
                                <div class="border-b-1 border-black w-2/3 "></div>
                                <button type="button" className='flex gap-2 cursor-pointer w-full inline-flex items-center h-[48px] px-[22px] py-[12px]'>
                                    <PiSignOutBold className='h-[20px] w-[20px] text-[#FFFFFF]'/>
                                    <p className='text-[16px] text-[#FFFFFF] '>
                                        Sign out
                                    </p>
                                </button>                              
                            </div>
                            )
                        }
            </div>
        </header>
    );
}