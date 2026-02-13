import edit from '../../assets/icons/edit.png'

export default function PersonlInfos({email = "ochanglichang@gmail.com", username = "ochangli", onEditClick })
{
    return(
        <div className="p-6 bg-red-200  rounded-lg w-full h-[20%] space-y-2">
            {/* for edit button */}
            <div className="w-full flex justify-between items-center h-1/3 bg-white text-lg font-bold">
                <p>
                    Personal infos
                </p>
                    <button className="px-2 py-2 rounded-full bg-gray-100 flex font-bold rounded-full" onClick={onEditClick}>
                        Edit profile
                    </button>
            </div>
            {/* for email and  username */}
            <div className='flex justify-between h-2/3 items-center bg-gray-200 px-20' >
                <div className='Email'>
                    Email:  {email}
                </div>
                <div>
                    username: {username}
                </div>
            </div>
        </div>
    );
}