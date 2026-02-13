import { useState } from 'react';
import face from '../../assets/images/face.jpg'

export default function EditProfileForm()
{
    return(
        <div className='flex w-150 h-120 bg-sky-200 '>
            {/* for the infos Parts */}
            <div className='h-full bg-[#d9f99d] w-3/5 ml-auto'>

            </div>
            {/* for the avatar Parts */}
            <div className='flex flex-col h-full bg-[#fee2e2] w-2/5 ml-auto'>
                <div className='flex flex-col justify-start items-center h-5/6 bg-[#292524] pt-4 '>
                    <div className='h-30 w-30 bg-red-2 rounded-full transition duration-350 ease-in-out overflow-hidden'>
                        <img   src={face}
                            alt="testing img"
                            className='h-full w-full object-cover'>
                    </img>
                <p className='text-white '>"Ochangli"</p>
                </div>
            </div>
                <div className=''>

                </div>
            </div>
        </div>
    );

}

