import { RiDashboardHorizontalLine } from "react-icons/ri";
import { PiSignOutBold } from "react-icons/pi";

export default function ProfileDropdown()
{
    return(
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
    );
}