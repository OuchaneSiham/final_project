import React from 'react';
import { MdArrowBack } from 'react-icons/md';

export default function FriendsView({ onBack, friends })
{
  return (
    <div className="w-full min-h-screen bg-[linear-gradient(to_bottom,#162D2A,#2F3A32,#3E2411)] flex flex-col">
        <div className="flex items-center gap-3 px-[20px] py-[16px] border-b border-[#FFFFFF1A]">
            <button
                onClick={onBack}
                className="flex items-center justify-center w-[40px] h-[40px] rounded-full hover:bg-[#FFFFFF0A] transition-colors"
                >
                <MdArrowBack size={24} color="#FFFFFF" />
            </button>
            <h1 className="text-white text-[24px] font-semibold">Friends</h1>
        </div>
    </div>
    );
}
