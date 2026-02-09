import React, { useState } from 'react';
import { Zap, Briefcase, ShieldCheck, Globe2, Sparkles } from 'lucide-react';
import { ThemeState } from '../types';
import Header from './Header';
import { LoginForm } from './LoginForm';
import { ContainerDevWrapper } from './DevDocBanner';
import { CustomDropdown } from './SetupPage';

interface LoginScreenProps {
    onLogin: (merchant: string, user: string, pass: string, remember: boolean) => void;
    onSignUp?: () => void;
    themeState: ThemeState;
    error?: string;
    isLoading?: boolean;
    showClassNames?: boolean;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, onSignUp, themeState, error, isLoading, showClassNames }) => {

    const [formData, setFormData] = useState({ businessType: 'Retail & E-commerce' });
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const businessTypes = ["Retail & E-commerce", "Healthcare & Medical", "Finance & Banking", "Food & Beverage", "Technology & SaaS"];

    const handleLoginSubmit = (merchant: string, email: string, password: string, rememberMe: boolean) => {
        onLogin(merchant, email, password, rememberMe);
    };

    const toggleDropdown = (id: string) => () => setActiveDropdown(activeDropdown === id ? null : id);

    const safeTheme = themeState;
    const isExtracting = isLoading;
    const readOnly = false;

    return (
        <div className="min-h-screen w-full md:h-[800px] flex flex-col items-center justify-center bg-[#F8FAFC] p-4 md:p-6 lg:p-8">

            <div className="z-10 w-full h-full bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-[0_32px_120px_-20px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col md:flex-row border border-slate-100 dark:border-slate-800 transition-all duration-500">

                {/* Left Panel: Visual/Identity */}
                <div className="mesh-gradient w-full md:w-[50%] p-6 md:p-8 hidden md:block transition-all duration-300 h-full">
                    <div className="h-full w-full rounded-[2rem] relative p-12 flex flex-col justify-between overflow-hidden shadow-2xl">
                        <div className="z-10 flex items-center gap-3">
                            <div className="w-12 h-12 bg-white/10 backdrop-blur-xl rounded-xl flex items-center justify-center border border-white/20">
                                <Zap size={24} className="text-white" fill="white" />
                            </div>
                            <span className="text-white font-black text-2xl tracking-tighter">ZAP</span>
                        </div>

                        <div className="z-10 relative">
                            {/* <div className="mb-8 inline-flex items-center gap-2 py-2 px-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-sm">
                                <ShieldCheck size={16} />
                                <span className="text-[10px] font-black tracking-widest uppercase">
                                    Enterprise Grade Security
                                </span>
                            </div> */}

                            <h1 className="text-white text-5xl font-extrabold leading-[1.1] mb-6 drop-shadow-xl">
                                Design your business <br /> <span className="text-white/70 italic">at light speed.</span>
                            </h1>

                            <p className="text-blue-50/80 text-lg max-w-md font-medium leading-relaxed">
                                Join thousands of restaurants maximizing revenue and minimizing costs with ZAP's unified design engine.
                            </p>
                        </div>

                        <div className="z-10 flex items-center gap-6">
                            <div className="flex -space-x-3">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white/20 bg-slate-200 overflow-hidden shadow-lg">
                                        <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="user" />
                                    </div>
                                ))}
                                <div className="w-10 h-10 rounded-full border-2 border-white/20 bg-white/10 backdrop-blur-md flex items-center justify-center text-[10px] text-white font-bold">
                                    +2k
                                </div>
                            </div>
                            <span className="text-white/60 text-xs font-bold uppercase tracking-wider">Trusted by top merchants</span>
                        </div>

                        {/* Decorative Elements */}
                        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
                        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-white/20 rounded-full blur-[100px] animate-pulse"></div>
                        <div className="absolute -top-20 -left-20 w-80 h-80 bg-purple-500/20 rounded-full blur-[100px] animate-pulse delay-700"></div>
                    </div>
                </div>

                {/* Right Panel: Content/Auth */}
                <div className="w-full md:w-[50%] flex flex-col relative bg-white dark:bg-slate-950 transition-colors duration-300 h-full overflow-y-auto custom-scrollbar">

                    {/* Floating Controls */}
                    <div className="absolute top-8 right-8 z-20 flex gap-4">
                        <ContainerDevWrapper
                            showClassNames={showClassNames}
                            identity={{ displayName: "BusinessTypeSelect", type: "Field", value: formData.businessType, filePath: "state.formData.businessType" }}
                            className="min-w-[100px]"
                        >
                            <CustomDropdown
                                label=""
                                value={formData.businessType}
                                options={businessTypes}
                                onChange={(val) => setFormData({ ...formData, businessType: val })}
                                placeholder="Select Type"
                                icon={Briefcase}
                                themeState={safeTheme}
                                isOpen={activeDropdown === 'businessType'}
                                onToggle={toggleDropdown('businessType')}
                                disabled={isExtracting || readOnly}

                            />
                        </ContainerDevWrapper>
                    </div>

                    <div className="flex-1 flex items-center justify-center relative px-6 md:px-12 py-20">
                        {/* Background Micro-details */}
                        <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none">
                            <Zap size={400} strokeWidth={0.5} />
                        </div>

                        <div className="w-full max-w-md relative z-10">
                            <div className="text-center mb-10 flex flex-col items-center">
                                <div className="w-16 h-16 bg-gray-900 dark:bg-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg transform -rotate-3 transition-colors duration-300">
                                    <Zap size={32} className="text-white" fill="currentColor" />
                                </div>
                                <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2 tracking-tight transition-colors duration-300">Welcome Back</h1>
                                <p className="text-gray-500 dark:text-gray-400 transition-colors duration-300">Please enter your workspace details to continue.</p>
                            </div>

                            <LoginForm
                                themeState={themeState}
                                onSubmit={handleLoginSubmit}
                                onSignUpClick={onSignUp}
                                isLoading={isLoading}
                                error={error}
                            />

                            <div className="mt-8 text-center">
                                <p className="text-xs text-gray-400 dark:text-gray-500">
                                    By signing in, you agree to our <a href="#" className="underline hover:text-gray-900 dark:hover:text-gray-300 transition-colors">Terms of Service</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Signature */}
            {/* <p className="mt-8 text-slate-400 text-xs font-bold tracking-[0.2em] uppercase opacity-50">
                Powered by Antigravity AI &copy; 2026
            </p> */}

        </div>
    );
};

export default LoginScreen;
