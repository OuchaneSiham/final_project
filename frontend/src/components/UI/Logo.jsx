import LogoSvg from '../../assets/images/logo.svg';
import clsx from 'clsx'

export default function Logo({ variant = 'navbar' })
{
    return(
        <a href="/login" target='_self' 
            className="block mx-auto">
            <img src={LogoSvg}
                alt="LeetPong logo"
                className={clsx(
                    "block",
                    {
                        'block mt-4 mx-auto w-40 ' : variant === 'Logo',
                        'w-32 h-auto': variant === 'navbar',
                    }
                )}/>
        </a>
    );
}