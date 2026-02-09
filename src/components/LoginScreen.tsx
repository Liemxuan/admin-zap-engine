import React, { useState } from 'react';
import { Zap, Briefcase } from 'lucide-react';
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

    const [formData, setFormData] = useState({ businessType: '' });
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const businessTypes = ["Retail & E-commerce", "Healthcare & Medical", "Finance & Banking", "Food & Beverage", "Technology & SaaS"];

    const handleLoginSubmit = (merchant: string, email: string, password: string, rememberMe: boolean) => {
        onLogin(merchant, email, password, rememberMe);
    };

    const toggleDropdown = (id: string) => () => setActiveDropdown(prev => prev === id ? null : id);
    const safeTheme = themeState;
    const isExtracting = isLoading;
    const readOnly = false;

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#F9FAFB]">

            {/* 1. Global Navbar Integration */}
            {/* <Header
                title="ZAP"
                layout="minimal"
                theme={themeState}
                showLogin={false}
                showUser={false}
                disableSticky={true}
                className="bg-transparent border-transparent"
            /> */}
            <div className="z-10 w-full max-w-[1900px] h-[calc(100vh-2rem)] md:h-[calc(100vh-3rem)] min-h-[700px] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-slate-100 dark:border-slate-800 transition-colors duration-300">
                <div className="mesh-gradient w-full md:w-1/2 p-4 lg:p-6 hidden md:block transition-all duration-300 h-full">
                    <div className="h-full w-full rounded-2xl relative p-12 flex flex-col justify-between overflow-hidden shadow-inner">
                        <div className="flex items-center">
                            {/* <img src=@LOGO_DATA_URI
                 alt="ZAP Logo"
                 className="h-14 w-auto invert drop-shadow-md" /> */}
                        </div>

                        <div className="z-10 relative">
                            <div className="mb-6 inline-block">
                                <span className="py-1.5 px-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-bold tracking-wider uppercase shadow-sm">
                                    Enterprise Solutions
                                </span>
                            </div>
                            <p className="text-blue-50 text-base mb-3 font-semibold tracking-wide uppercase opacity-90">
                                Empower your restaurant with ZAP
                            </p>
                            <h1 className="text-white text-5xl font-bold leading-tight drop-shadow-md">
                                Maximize Revenue &amp; Minimize Costs for your F&amp;B Business
                            </h1>
                        </div>

                        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
                        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-purple-500 rounded-full blur-3xl opacity-30 mix-blend-screen animate-pulse"></div>
                    </div>

                </div>
                <div className="w-full md:w-1/2 flex flex-col justify-center relative bg-white dark:bg-slate-950 transition-colors duration-300 h-full overflow-y-auto">
                    <div className="absolute top-0 right-0 z-10">
                        <ContainerDevWrapper showClassNames={showClassNames} identity={{ displayName: "BusinessTypeSelect", type: "Field", value: formData.businessType, filePath: "state.formData.businessType" }}>
                            <CustomDropdown
                                label="Business Type"
                                value={formData.businessType}
                                options={businessTypes}
                                onChange={(val) => setFormData({ ...formData, businessType: val })}
                                placeholder="Select Type"
                                icon={Briefcase}
                                themeState={safeTheme}
                                isOpen={activeDropdown === 'businessType'}
                                onToggle={toggleDropdown('businessType')}
                                disabled={isExtracting || readOnly}
                                required
                            />
                        </ContainerDevWrapper>
                    </div>
                    {/* Main Content Area */}
                    <div className="flex-1 flex items-center justify-center relative overflow-hidden px-4 bg-white dark:bg-slate-950">

                        {/* Animated Background Elements */}
                        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full mix-blend-multiply filter blur-[80px] opacity-70 animate-pulse"></div>
                            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full mix-blend-multiply filter blur-[80px] opacity-70 animate-pulse delay-700"></div>
                        </div>

                        <div className="w-full max-w-md p-8 md:p-12 relative z-10">
                            <div className="text-center mb-10 flex flex-col items-center">
                                <div className="w-16 h-16 bg-gray-900 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg transform -rotate-3">
                                    <Zap size={32} className="text-white" fill="currentColor" />
                                </div>
                                <h1 className="text-3xl font-extrabold text-gray-900 mb-2 tracking-tight">Welcome Back</h1>
                                <p className="text-gray-500">Sign in to manage your design system</p>
                            </div>

                            <LoginForm
                                themeState={themeState}
                                onSubmit={handleLoginSubmit}
                                onSignUpClick={onSignUp}
                                isLoading={isLoading}
                                error={error}
                            />

                            <div className="mt-8 text-center">
                                <p className="text-xs text-gray-400">
                                    By signing in, you agree to our <a href="#" className="underline hover:text-gray-900">Terms of Service</a>
                                </p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default LoginScreen;