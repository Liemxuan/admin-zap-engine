import React from 'react';
import {
    Search,
    Bell,
    Menu,
    Moon,
    Sun,
    Settings,
    Command,
    ExternalLink,
    Sparkles,
    LogOut
} from 'lucide-react';
import { useStore } from '../../store';
import { cn } from '../../lib/utils';

interface DashboardHeaderProps {
    onMenuClick: () => void;
    onLogout?: () => void;
    className?: string;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ onMenuClick, onLogout, className }) => {
    const theme = useStore(state => state.computedTheme);
    const [isSearchFocused, setIsSearchFocused] = React.useState(false);

    return (
        <header className={cn(
            "h-24 flex items-center justify-between px-8 transition-all duration-300 z-30",
            className
        )}>
            {/* Left: Menu & Search */}
            <div className="flex items-center gap-6 flex-1 max-w-2xl">
                <button
                    onClick={onMenuClick}
                    className="p-3 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-500 hover:text-purple-600 transition-all shadow-sm hover:shadow-md active:scale-95 group"
                >
                    <Menu size={20} className="group-hover:rotate-12 transition-transform" />
                </button>

                <div className={cn(
                    "relative group flex-1 max-w-md transition-all duration-300",
                    isSearchFocused ? "max-w-xl scale-[1.02]" : ""
                )}>
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-purple-600 transition-colors">
                        <Search size={18} />
                    </div>
                    <input
                        type="text"
                        placeholder="Search for merchants, tasks, or settings..."
                        onFocus={() => setIsSearchFocused(true)}
                        onBlur={() => setIsSearchFocused(false)}
                        className="w-full h-12 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl pl-12 pr-12 text-sm font-medium outline-none transition-all focus:ring-4 focus:ring-purple-500/10 focus:border-purple-500/30 text-slate-800 dark:text-white"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 px-1.5 py-1 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-lg pointer-events-none">
                        <Command size={10} className="text-slate-400" />
                        <span className="text-[10px] font-bold text-slate-400 uppercase">K</span>
                    </div>
                </div>
            </div>

            {/* Right: Actions & User */}
            <div className="flex items-center gap-4">
                {/* Quick Actions */}
                <div className="hidden md:flex items-center gap-2 mr-4 px-4 py-2 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                    <button className="p-2 text-slate-400 hover:text-purple-600 transition-colors relative group">
                        <Bell size={18} />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-slate-50 dark:border-slate-800" />
                        <div className="absolute top-full right-0 mt-4 w-64 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-xl opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 transition-all p-4 z-50">
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Newest Updates</p>
                            <div className="space-y-3">
                                <div className="flex gap-3 items-start">
                                    <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600 shrink-0">
                                        <Sparkles size={14} />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold dark:text-white">Design Engine Update</p>
                                        <p className="text-[10px] text-slate-400">Sidebar nested navigation is now live!</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </button>
                    <div className="w-px h-4 bg-slate-200 dark:bg-slate-700 mx-1" />
                    <button className="p-2 text-slate-400 hover:text-purple-600 transition-colors">
                        <ExternalLink size={18} />
                    </button>
                    <div className="w-px h-4 bg-slate-200 dark:bg-slate-700 mx-1" />
                    <button
                        onClick={onLogout}
                        className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                        title="Logout"
                    >
                        <LogOut size={18} />
                    </button>
                </div>

                {/* User Profile */}
                <div className="flex items-center gap-4 p-2 pl-4 pr-3 border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl shadow-sm hover:shadow-md transition-all cursor-pointer group">
                    <div className="flex flex-col items-end mr-1">
                        <span className="text-sm font-bold text-slate-800 dark:text-white truncate max-w-[120px]">Nguyen PC</span>
                        <div className="flex items-center gap-1.5 leading-none mt-1">
                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">Super Admin</span>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center border border-white dark:border-slate-800 shadow-md group-hover:scale-105 transition-transform">
                            <span className="text-xs font-black text-white">NP</span>
                        </div>
                        <div className="absolute -top-1 -right-1 p-0.5 bg-white dark:bg-slate-900 rounded-md shadow-sm opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all">
                            <Settings size={10} className="text-slate-400" />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};
