import loses from '../../assets/icons/loses.png'
import win from '../../assets/icons/winicone.png'


export default function Box({icon = win, state = "win", value = 10})
{
    return(
        // <div className='flex flex-col h-30 bg-[#fdba74] w-55 rounded-2xl  '>
        //     <div className='flex items-center gap-9 justify-start  w-full h-1/2 bg-red-100 rounded-2xl rounded-b-none'>
        //          <div className='h-15 w-15 bg-red-2 rounded-xl transition duration-350 ease-in-out overflow-hidden'>
        //             <img   src={icon}
        //                     alt="testing img"
        //                     className='h-full w-full object-cover'>
        //             </img>
        //         </div>
        //             <p>{state}</p>
        //     </div>
        //     <div className='flex  h-1/2 justify-center bg-blue-100 items-center rounded-2xl rounded-t-none'>
        //         <span>{value}</span>
        //     </div>
        // </div>
        <div className='flex f h-30 bg-[#fdba74] w-55 rounded-2xl  '>
            <div className='flex justify-center items-center h-full w-1/2 '>
                <div className='h-20 w-20 bg-red-2 rounded-xl transition duration-350 ease-in-out overflow-hidden'>
                    <img   src={icon}
                        alt="testing img"
                        className='h-full w-full object-cover'>
                    </img>
                 </div>
            </div>
            <div className='flex items-start pl-5 space-y-5 justify-center flex-col h-full w-1/2'>
                <span>{state}</span>
                <span>{value}</span>
            </div>
        </div>
    );
}