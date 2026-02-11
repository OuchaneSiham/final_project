import Input from '../../component/ui/Input';
import PasswordInput from '../../component/ui/PasswordInput';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import AdminSingin from '../../component/ui/AdminSignIn';

export default function LoginForm({ isAdminLogin = false }) {
    const [username, setUsernameName] = useState('');
    const [password, setPassword] = useState('');
    const buttonStyleOff = 'w-full h-10 bg-[#4A3B2F] mt-4 border-0 rounded-lg text-black';
    const buttonStyleOn = 'w-full h-10 bg-[#D4A574] mt-4 border-0 rounded-lg text-black';

    const navigate = useNavigate();
    const loginUrl = "http://localhost:8281/api/v1/users/login";
    const adminUrl = "http://localhost:8281/api/v1/admin/login"; // your admin endpoint
    
    const isFormValid = username.trim() !== "" && password.trim() !== "";
    
    const handlechangeLogin = (event) => {
        const { id, value } = event.target;
        if (id === 'username') {
            setUsernameName(value);
        } else if (id === 'password') {
            setPassword(value);
        }
    };

    const handleSubmitLogin = async (event) => {
        event.preventDefault();
        const url = isAdminLogin ? adminUrl : loginUrl;
        
        try {
            const resp = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });
            const data = await resp.json();
            const sessionToken = data.token;
            localStorage.setItem("token", sessionToken);
            navigate(isAdminLogin ? "/admin" : "/profile");
        } catch (error) {
            console.log("error is ", error);
        }
    };
    
    return (
        <div className='text-[#E5E5E5]'>
            <p className='text-[24px] text-white font-medium text-center mb-3'>
                {isAdminLogin ? "Sign in as Admin" : "Sign in to LEETPONG"}
            </p>
            
            <div className='grid gap-y-4 rounded-2xl border-1 border-[#2A2420] mt-5 max-w-md mx-3 px-4 py-4 py-5'>
                <Input 
                    htmlFor="username"
                    text='username'
                    id='username'
                    type='text'
                    value={username}
                    onChange={handlechangeLogin}
                />
                <PasswordInput
                    htmlFor='password'
                    text='password'
                    id='password'
                    value={password}
                    onChange={handlechangeLogin}
                />
                <button
                    disabled={!isFormValid}
                    onClick={handleSubmitLogin}
                    className={isFormValid ? buttonStyleOn : buttonStyleOff}>
                    {isAdminLogin ? "Sign in as Admin" : "sign in"}
                </button>
                {!isAdminLogin ? (
                    <AdminSingin/>
                ) : (
                    <button 
                        onClick={() => navigate('/login')}
                        className="w-full py-4 bg-[#4A3B2F] text-[#D4A574] font-semibold rounded-xl hover:bg-[#3A2B1F] transition-colors border border-[#D4A574]">
                        Back to User Login
                    </button>
                )}
            </div>
        </div>
    );
}