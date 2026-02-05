import notificationIcone from '/Users/ochangli/Desktop/tictactoe/frontend/src/assets/images/notificationIcone.png';
import clsx from 'clsx'

export default function NotifIcone({Notificationstate, changebellState})
{
    return(
        <button className='relative h-6 w-6 rounded-full flex items-center justify-center transition-colors'
                onClick={changebellState}>
            <img
                src={notificationIcone}
                alt="notification button"
                className=''/>
            <span
                className={clsx(
                     "absolute -top-1 -right-0 h-3 w-3 text-white rounded-full",
                     Notificationstate ? "bg-red-500" : "" 
                 )}>
            </span>
        </button>
    );
}