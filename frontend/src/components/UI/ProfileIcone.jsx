import face from '/Users/ochangli/Desktop/tictactoe/frontend/src/assets/images/face.jpg';


export default function ProfileIcone({className})
{
    return (
        <button className='h-12 w-12 rounded-full overflow-hidden'>
            <img   src={face}
                alt="testing img"
                className='h-full w-full object-cover'
                />
        </button>
    );
}