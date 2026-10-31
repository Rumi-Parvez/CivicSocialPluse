import Image from "next/image";
import Link from "next/link";

import LogoB from './../app/assets/logoB.png'
import LogoW from './../app/assets/LogoW.png'

const Navbar = () => {
    const navLinks = (
        <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors">
                Home
            </Link>
            <Link href="/upcoming-events" className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors">
                Upcoming Events
            </Link>
        </div>
    );
        
    const userslogin = (
        <div className="flex items-center gap-3">
            <Link href="/login">
                <button className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-emerald-600 transition-colors cursor-pointer">
                    Login
                </button>
            </Link>
            <Link href="/sign-up">
                <button className="px-5 py-2 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-full shadow-md shadow-emerald-100 transition-all cursor-pointer">
                    Sign Up
                </button>
            </Link>
        </div>
    );
    
    return (
        <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm transition-all">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    
                    
                    <div className="flex-shrink-0">
                        <Link href="/">
                            <Image 
                                src={LogoB}
                                alt="Logo"
                                width={120} 
                                height={40} 
                                className="w-28 h-auto object-contain"
                                priority
                            />
                        </Link>
                    </div>

                    
                    <div>
                        {navLinks}
                    </div>

                

                   
                    <div className="flex items-center gap-3">
                        {userslogin}
                    </div>

                </div>
            </div>
        </header>
    );
};

export default Navbar;