import face from '../../assets/images/face.jpg'
import pen from '../../assets/icons/pen.png'
import InputEdit from './InputEdit';


export default function ProfileEdit({ userData, updatedData, setUpdatedData, onSave, onCancel, handleAvatarChange })
{
    return(
       <div className="bg-gray-100 w-full max-w-2xl max-h-[80vh] overflow-auto rounded-xl p-6">
            {/*Modla Content Parent of teh sections*/}
            <div className="grid grid-rows-[auto-1fr-auto] gap-1">
                {/* Header section  */}
                <header className="flex items-center  justify-center text-lg font-bold">
                    Edit Profile
                </header>

                {/* Main section  */}
                <main className=" grid grid-cols-1 md:grid-cols-2 md:grid-cols-[1fr_1.9fr] md:divide-x-1 divide-dashed">
                    
                        {/* for the Profile Picture and username*/}
                        <div className="rounded-t-2xl lg:rounded-l-2xl lg:rounded-t-none bg-white flex flex-col justify-center items-center gap-2 p-5">              
                            <div className='relative'>
                                <img src={face} alt="profile image" className='w-22 h-22 md:w-36 md:h-36 rounded-full object-cover overflow-hidden border-2 border-gray-100 '  />    
                                <button className='absolute bottom-0 right-2 sm:w-6 sm:h-6 h-3 w-3 rounded-full flex items-center justify-center bg-gray-100 shadow-md' onClick={handleAvatarChange}>
                                    <img src={pen} alt="edit profile avatar icone" />
                                </button>
                            </div>
                            <span class="text-lg font-semibold">ochangli</span>
                        </div>  

                        {/* for the inputs files (username, password, email ...)*/}
                        
                        <div className='w-full max-w-sm sm:max-w-md lg:max-w-lg rounded-b-2xl lg:rounded-r-2xl lg:rounded-bl-none flex flex-col bg-white gap-1 p-6  px-4 items-start '>
                            {/* Usename Section */}
                            <label className='mx-2'>
                                Username
                            </label>
                                <InputEdit 
                                    label="Username"
                                    type="text"
                                    value={updatedData}
                                    onChange={(e) => setUpdatedData({...updatedData, username: e.target.value})}
                                />
                            {/* email Section */}
                            <label className='mx-2'>
                                 e-mail
                            </label>
                                <InputEdit 
                                        label="email"
                                        type="email"
                                        value={updatedData}
                                        onChange={(e) => setUpdatedData({...updatedData, email: e.target.value})}
                                    />
                            {/* old Password Section */}
                            <label className='mx-2'>
                                old Password
                            </label>
                                <InputEdit 
                                        label="password"
                                        type="password"
                                        value={updatedData} //currentPassword
                                        onChange={(e) => setUpdatedData({...updatedData, currentPassword: e.target.value})}
                                />
                            {/* new Password Section */}
                            <label className='mx-2'>
                                New Password
                            </label>
                                <InputEdit 
                                        label="password"
                                        type="password"
                                        value={updatedData} //updatedData.password
                                        onChange={(e) => setUpdatedData({...updatedData, password: e.target.value})}
                                />
                        </div>


                </main>

                {/* footer section  */}
                <footer className='flex items-center justify-end space-x-2 p-3 bg-gray-100 justify-center text-lg font-bold'>
                            <button className='bg-gray-50 border text-gray-700 hover:bg-gray-100 text-sm font-medium rounded-full px-6 py-2 border-gray-300' onClick={onCancel}>
                                cancel
                            </button>
                            <button className='bg-black text-white duration-100 hover:bg-gray-800 rounded-full justify-center items-center font-medium border-[1px] px-6 py-2.5 text-base' onClick={onSave} >
                                save Changes
                            </button>
                </footer>

            </div>
       </div>
    );
}