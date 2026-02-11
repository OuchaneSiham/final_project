import Logo from "../../../components/Logo";
import LoginForm from "./LoginForm";
import RedirectionLine from "../../../components/RedirectionLine";
import SocialButton from "../../../components/SocialButton";
    return(
        <div className='min-h-screen bg-[#111115] flex
                        justify-center items-center ' >
            <div className=' 
                            max-w-md w-full
                            bg-[#18181C]/100 space-y-9 px-4
                            rounded-4xl border-1 border-[#3D3229] '>
                <Logo/>
                <LoginForm isAdminLogin={isAdmin}/>
                <RedirectionLine text="new Here ?" link="/signup" linkText="create new account"/>
                <SocialButton/>
                <PrivacyPolicy/>
            </div>
        </div>
    );

}