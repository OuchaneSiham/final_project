import notificationIcone from '/Users/ochangli/Desktop/tictactoe/frontend/src/assets/images/notificationIcone.png';

export default function NotifIcone({state = 'off'})
{
    return(
        <button className='relative h-6 w-6 rounded-full flex items-center justify-center transition-colors'>
            <img
                src={notificationIcone}
                alt="notification button"
                className=''/>
            <span 
                class="absolute -top-1 -right-1 h-3 w-3 bg-red-500 text-white rounded-full">
            </span>
        </button>
    );
}