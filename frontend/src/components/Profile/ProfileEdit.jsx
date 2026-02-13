

export default function ProfileEdit({onSave, onCancel , onAvatarChange, })
{
    return(
       <div className="bg-white w-full max-w-md max-h-[80vh] overflow-auto rounded-xl p-6">
            {/*Modla Content Parent of teh sections*/}
            <div className="bg-red-100 grid grid-rows-[auto-1fr-auto] gap-4">
                {/* Header section  */}
                <header className="flex items-center justify-center text-lg font-bold">
                    Edit Profile
                </header>

                {/* Main section  */}
                <main></main>

                {/* footer section  */}
                <footer></footer>

            </div>
       </div>
    );
}