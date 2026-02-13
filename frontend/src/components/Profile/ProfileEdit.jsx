import face from '../../assets/images/face.jpg'
import { PencilIcon } from '@heroicons/react/24/solid';
import pen from '../../assets/icons/pen.png'

export default function ProfileEdit({onSave, onCancel , onAvatarChange, props})
{
    return(
       <div className="bg-white w-full max-w-2xl max-h-[80vh] overflow-auto rounded-xl p-6">
            {/*Modla Content Parent of teh sections*/}
            <div className="bg-red-100 grid grid-rows-[auto-1fr-auto] gap-4">
                {/* Header section  */}
                <header className="flex items-center justify-center text-lg font-bold">
                    Edit Profile
                </header>

                {/* Main section  */}
                <main className="grid grid-cols-1 md:grid-cols-2 md:grid-cols-[1.5fr_1fr] md:divide-x-2 divide-dashed">
                    
                        {/* for the inputs files (username, password, email ...)*/}
                        {/* for the Profile Picture and username*/}
                        <div>

                        </div>
                        <div className="bg-white flex flex-col items-center gap-2 p-5">              
                            <div className='relative'>
                                <img src={face} alt="profile image" className='w-16 h-16 sm:w-24 sm:h-24 rounded-full object-cover overflow-hidden border-2 border-gray-100 '  />    
                                <button className='absolute bottom-0 right-2 sm:w-6 sm:h-6 h-3 w-3 rounded-full flex items-center justify-center bg-gray-100 shadow-md' onClick={onAvatarChange}>
                                    <img src={pen} alt="edit profile avatar icone" />
                                </button>
                            </div>
                            <span class="text-lg font-semibold">ochangli</span>
                        </div>  

                </main>

                {/* footer section  */}
                <footer></footer>

            </div>
       </div>
    );
}

ProfileEdit.defaultProps = {
  
        username: "Ochangli",
        avatar: {face}
};