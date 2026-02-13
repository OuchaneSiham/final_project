import face from '../../assets/images/face.jpg'
import pen from '../../assets/icons/pen.png'

export default function ProfileEdit({ userData, updatedData, setUpdatedData, onSave, onCancel, handleAvatarChange })
{
    return(
       <div className="bg-white w-full max-w-2xl max-h-[80vh] overflow-auto rounded-xl p-6">
            {/*Modla Content Parent of teh sections*/}
            <div className="bg-red-100 grid grid-rows-[auto-1fr-auto] gap-1">
                {/* Header section  */}
                <header className="flex items-center bg-gray-100 justify-center text-lg font-bold">
                    Edit Profile
                </header>

                {/* Main section  */}
                <main className="grid grid-cols-1 md:grid-cols-2 md:grid-cols-[1.5fr_1fr] md:divide-x-2 divide-dashed">
                    
                        {/* for the inputs files (username, password, email ...)*/}
                        
                        <div className='flex flex-col bg-blue-100 gap-1 pt-6 rounded-xl px-4 items-start '>
                            {/* Usename Section */}
                            <label >
                                Username
                            </label>
                                <input type="text"
                                    className='border-1 rounded-lg w-full max-w-2xl'
                                    value={updatedData} //username
                                    onChange={(e) => setUpdatedData({...updatedData, username: e.target.value})
                                }/>
                            {/* email Section */}
                            <label >
                                 e-mail
                            </label>
                                <input type="email"
                                    className='border-1 rounded-lg w-full max-w-2xl'
                                    value={updatedData} //.email
                                    onChange={(e) => setUpdatedData({...updatedData, email: e.target.value})
                                }/>
                            {/* old Password Section */}
                            <label >
                                old Password
                            </label>
                                <input type="email"
                                    className='border-1 rounded-lg w-full max-w-2xl'
                                    value={updatedData} //.email
                                    onChange={(e) => setUpdatedData({...updatedData, email: e.target.value})
                                }/>
                            {/* new Password Section */}
                            <label >
                                New Password
                            </label>
                                <input type="email"
                                    className='border-1 rounded-lg w-full max-w-2xl'
                                    value={updatedData} //.email
                                    onChange={(e) => setUpdatedData({...updatedData, email: e.target.value})
                                }/>
                        </div>

                        {/* for the Profile Picture and username*/}
                        <div className="bg-white flex flex-col items-center gap-2 p-5">              
                            <div className='relative'>
                                <img src={face} alt="profile image" className='w-16 h-16 sm:w-24 sm:h-24 rounded-full object-cover overflow-hidden border-2 border-gray-100 '  />    
                                <button className='absolute bottom-0 right-2 sm:w-6 sm:h-6 h-3 w-3 rounded-full flex items-center justify-center bg-gray-100 shadow-md' onClick={handleAvatarChange}>
                                    <img src={pen} alt="edit profile avatar icone" />
                                </button>
                            </div>
                            <span class="text-lg font-semibold">ochangli</span>
                        </div>  

                </main>

                {/* footer section  */}
                <footer className='flex items-center justify-end space-x-7 p-3 bg-gray-100 justify-center text-lg font-bold'>
                            <button>
                                cancel
                            </button>
                            <button className='rounded-2xl border-[1px] p-3'>
                                save Changes
                            </button>
                </footer>

            </div>
       </div>
    );
}