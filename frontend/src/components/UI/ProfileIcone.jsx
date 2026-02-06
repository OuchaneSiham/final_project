import face from '/Users/ochangli/Desktop/tictactoe/frontend/src/assets/images/face.jpg';
// import DropDown from './DropDown';

export default function ProfileIcone({className})
{
    return (
        <>
        <button className='relative '>
            <div className='h-12 w-12 rounded-full hover:scale-125 transition duration-350 ease-in-out overflow-hidden'>
                <img   src={face}
                    alt="testing img"
                    className='h-full w-full object-cover'>
                </img>
            </div>

        </button>

        </>
    );
}