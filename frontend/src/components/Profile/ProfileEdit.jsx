import face from '../../assets/images/face.jpg'


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
                        <div className=''>

                        </div>
                        {/* for the Profile Picture and username*/}
                        <div className="bg-white flex flex-col items-center gap-2 p-5">
                            <img src={face} alt="profile image" className='w-16 h-16 sm:w-24 sm:h-24 rounded-full object-cover overflow-hidden border-2 border-gray-100 '  />    
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