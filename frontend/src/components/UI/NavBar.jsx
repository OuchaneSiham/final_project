import Logo from "./Logo";


export default function Navbar()
{
    return (
        <nav className="flex items-center justify-between w-full h-20 border mt-[3] rounded-[19px] border-[#C77966]/20 bg-[#4A302A] mb-8 ">
            <div className="flex-1"/>
            <Logo variant ='Logo'/>
            <div className="flex-1">
                
            </div>
        </nav>
    );
}