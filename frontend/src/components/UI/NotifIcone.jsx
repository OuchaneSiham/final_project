import notificationIcone from '/Users/ochangli/Desktop/tictactoe/frontend/src/assets/images/notificationIcone.png';
import clsx from 'clsx'

export default function NotifIcone({Notificationstate, changebellState})
{
    return(
        <button className='relative h-6 w-6 rounded-full flex justify-start transition-colors'
                onClick={changebellState}>
            <img
                src={notificationIcone}
                alt="notification button"
                className=''/>
                <span class="-top-1 -left-2 relative flex size-3">
                    <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-300"></span>
                    <span class="relative inline-flex size-3 rounded-full bg-sky-500"></span>
                </span>
        </button>
    );
}