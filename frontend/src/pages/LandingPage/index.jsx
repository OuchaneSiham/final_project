import Players from '../../assets/LandingPageAssets/Players.png';
import Logo from '../../components/UI/Logo';

export default function Landing()
{
    return(
        <div className="relative h-screen w-screen overflow-hidden flex items-center justify-center">
            <img
                src="/LPbackground.png"
                alt="background"
                className="absolute inset-0 h-full w-full object-cover -z-10"
            />
            <div className="flex flex-col items-center gap-8 -mt-50">
                <Logo variant='Landing'/>
                <p className='text-4xl md:text-5xl font-bold text-amber-50 tracking-wide drop-shadow-lg'>
                    Welom to ping pong
                </p>
                <div className="flex gap-4 mt-4">
                    <button className="px-8 py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-200">
                        Start Now
                    </button>
                    <button className="px-8 py-3 bg-stone-700 hover:bg-stone-600 text-amber-50 font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:translate-y-2 transition-all duration-200 border border-amber-500/30">
                        Sign in as Admin
                    </button>
                </div>
            </div>
         </div>
    );
}

// export default function Landing()
// {
//     return(
//         <div className="relative h-screen w-screen overflow-hidden flex items-center justify-center">
//             <img
//                 src="/LPbackground.png"
//                 alt="background"
//                 className="absolute inset-0 h-full w-full object-cover -z-10"
//             />
//             <div className="flex flex-col items-center gap-8">
//                 <Logo variant='Landing'/>
//                 {/* You can add tagline, buttons, etc. here */}
//             </div>
//          </div>
//     );
// }