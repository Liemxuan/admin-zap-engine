import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard,
    Users,
    ShoppingCart,
    LogOut,
    ChevronLeft,
    ChevronRight,
    Zap,
    Settings,
    Layers,
    PieChart,
    MessageSquare,
    Globe,
    Sparkles,
    ArrowLeft
} from 'lucide-react';
import { ThemeState } from '../../types';
import { cn } from '../../lib/utils';

interface SidebarProps {
    isExpanded: boolean;
    onToggle: (expanded?: boolean) => void;
    themeState: ThemeState;
    onLogout: () => void;
}

interface MenuItem {
    name: string;
    path: string;
    icon: any;
    subItems?: { name: string; path: string }[];
}

const menuItems: MenuItem[] = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Merchants', path: '/merchants', icon: Globe },
    { name: 'Customers', path: '/users', icon: Users },
    { name: 'Orders', path: '/orders', icon: ShoppingCart },
    { name: 'Statistics', path: '/stats', icon: PieChart },
    { name: 'Messages', path: '/messages', icon: MessageSquare },
    {
        name: 'Design Hub',
        path: '/design',
        icon: Layers,
        subItems: [
            { name: 'Typography', path: '/design/typography' },
            { name: 'UI Kit', path: '/design/ui-kit' },
            { name: 'Forms', path: '/design/forms' },
            { name: 'Icons', path: '/design/icons' },
            { name: 'Project Info', path: '/design/project' },
        ]
    },
    {
        name: 'Settings',
        path: '/settings',
        icon: Settings,
        subItems: [
            { name: 'General', path: '/settings/general' },
            { name: 'Security', path: '/settings/security' },
            { name: 'Notifications', path: '/settings/notifications' },
            { name: 'API Keys', path: '/settings/api' },
        ]
    },
];

export const Sidebar: React.FC<SidebarProps> = ({ isExpanded, onToggle, themeState, onLogout }) => {
    const [activeSubMenu, setActiveSubMenu] = useState<MenuItem | null>(null);
    const location = useLocation();
    const navigate = useNavigate();

    // Reset sub-menu when location changes to a non-sub-menu item
    useEffect(() => {
        const currentItem = menuItems.find(item =>
            location.pathname === item.path ||
            item.subItems?.some(sub => location.pathname.startsWith(sub.path))
        );

        if (currentItem?.subItems) {
            setActiveSubMenu(currentItem);
            if (isExpanded) onToggle(false); // Collapse main when sub is active
        } else {
            setActiveSubMenu(null);
        }
    }, [location.pathname]);

    const handleItemClick = (item: MenuItem) => {
        if (item.subItems) {
            setActiveSubMenu(item);
            onToggle(false); // Collapse main sidebar
            // Optionally navigate to the first sub-item
            // navigate(item.subItems[0].path);
        } else {
            setActiveSubMenu(null);
            onToggle(true); // Re-expand main if clicking a top-level item without sub-nav
        }
    };

    const handleBack = () => {
        setActiveSubMenu(null);
        onToggle(true);
    };

    return (
        <div className={cn(
            "flex relative h-[calc(100vh)] group transition-all duration-500",
            activeSubMenu ? "w-[22rem]" : (isExpanded ? "w-72" : "w-24")
        )}>
            {/* Main Sidebar Pane */}
            <aside
                className={cn(
                    "h-full bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-500 flex flex-col overflow-hidden relative z-20",
                    isExpanded ? "w-72" : "w-24"
                )}
            >
                {/* Background Decorative Mesh */}
                <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-br from-purple-500/5 to-transparent pointer-events-none opacity-50" />

                {/* Logo Section */}
                <div className={cn(
                    "p-6 mb-4 flex items-center transition-all duration-500",
                    isExpanded ? "px-8" : "justify-center"
                )}>
                    <button
                        onClick={() => navigate('/')}
                        className="relative outline-none"
                    >
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-200 dark:shadow-none transition-transform duration-300 hover:scale-110">
                            <Zap size={24} className="text-white" fill="white" />
                        </div>
                    </button>
                    {isExpanded && (
                        <div className="ml-4 animate-fade-in">
                            <h2 className="text-xl font-black text-slate-800 dark:text-white tracking-tighter">ZAP <span className="text-purple-600">ADMIN</span></h2>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Enterprise v4</p>
                        </div>
                    )}
                </div>

                {/* Navigation Menu */}
                <nav className="flex-1 px-4 py-2 space-y-1 overflow-y-auto custom-scrollbar">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isSubActive = activeSubMenu?.name === item.name;
                        const isExactlyActive = location.pathname === item.path || (item.subItems?.some(sub => location.pathname === sub.path));

                        return (
                            <button
                                key={item.path}
                                onClick={() => handleItemClick(item)}
                                className={cn(
                                    "w-full flex items-center gap-4 p-4 rounded-2xl font-bold transition-all duration-300 group/item relative outline-none",
                                    isExactlyActive || isSubActive
                                        ? "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 shadow-sm"
                                        : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white",
                                    !isExpanded && "justify-center"
                                )}
                            >
                                <Icon size={22} className="shrink-0 transition-transform duration-300 group-hover/item:scale-110" />
                                {isExpanded && (
                                    <div className="flex flex-1 items-center justify-between">
                                        <span className="whitespace-nowrap animate-fade-in">{item.name}</span>
                                        {item.subItems && <ChevronRight size={14} className={cn("opacity-50 transition-transform duration-300", isSubActive && "rotate-90")} />}
                                    </div>
                                )}

                                {/* Selected Indicator Dot */}
                                <div className={cn(
                                    "absolute left-0 w-1 bg-purple-600 rounded-r-full transition-all duration-300",
                                    (isExactlyActive || isSubActive) ? "h-6" : "h-0"
                                )} />
                            </button>
                        );
                    })}
                </nav>

                {/* Profile & Logout are same as before but wrapped in a cleaner way */}
                <div className="p-4 space-y-2">
                    <div className={cn(
                        "flex items-center p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 transition-all duration-300",
                        isExpanded ? "gap-3" : "justify-center"
                    )}>
                        <img
                            src="https://i.pravatar.cc/100?img=12"
                            alt="avatar"
                            className="w-10 h-10 rounded-xl object-cover ring-2 ring-white dark:ring-slate-800"
                        />
                        {isExpanded && (
                            <div className="flex-1 min-w-0 animate-fade-in">
                                <h4 className="text-sm font-bold text-slate-800 dark:text-white truncate">Nguyen PC</h4>
                                <p className="text-[10px] text-slate-400 font-medium truncate uppercase tracking-tighter">Chief Architect</p>
                            </div>
                        )}
                    </div>

                    <button
                        onClick={onLogout}
                        className={cn(
                            "w-full flex items-center gap-4 p-4 rounded-2xl font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-all duration-300 active:scale-95",
                            !isExpanded && "justify-center px-0"
                        )}
                    >
                        <LogOut size={22} />
                        {isExpanded && <span className="animate-fade-in">Logout</span>}
                    </button>
                </div>

                {/* Toggle Button */}
                <button
                    onClick={() => onToggle(!isExpanded)}
                    className="absolute top-8 -right-3 w-7 h-7 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full shadow-md flex items-center justify-center text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300 opacity-0 group-hover:opacity-100 z-30"
                >
                    {isExpanded ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
                </button>
            </aside>

            {/* Sub-Navigation Panel */}
            <div
                className={cn(
                    "absolute top-0 left-24 h-full bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-2xl border-y border-r border-slate-100 dark:border-slate-800 rounded-r-[2.5rem] transition-all duration-500 z-10 overflow-hidden",
                    activeSubMenu ? "w-64 translate-x-0 opacity-100" : "w-0 -translate-x-10 opacity-0 pointer-events-none"
                )}
            >
                {activeSubMenu && (
                    <div className="p-6 h-full flex flex-col animate-fade-in">
                        <div className="flex items-center gap-3 mb-8">
                            <button
                                onClick={handleBack}
                                className="p-2 rounded-xl hover:bg-white dark:hover:bg-slate-800 shadow-sm transition-all"
                            >
                                <ArrowLeft size={18} className="text-slate-400" />
                            </button>
                            <div>
                                <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest">{activeSubMenu.name}</h3>
                                <div className="flex items-center gap-1 text-[10px] text-purple-600 font-bold uppercase">
                                    <Sparkles size={10} />
                                    <span>Explorer</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 space-y-1 overflow-y-auto custom-scrollbar px-2">
                            {activeSubMenu.subItems?.map((sub) => (
                                <NavLink
                                    key={sub.path}
                                    to={sub.path}
                                    className={({ isActive }) => cn(
                                        "flex items-center gap-3 p-3 rounded-xl font-bold transition-all duration-300",
                                        isActive
                                            ? "bg-white dark:bg-slate-800 text-purple-600 shadow-[0_4px_12px_rgba(0,0,0,0.03)] border border-slate-100 dark:border-slate-700"
                                            : "text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-800/50"
                                    )}
                                >
                                    <div className={cn("w-1.5 h-1.5 rounded-full", location.pathname === sub.path ? "bg-purple-600 scale-125" : "bg-slate-300")} />
                                    <span className="text-sm">{sub.name}</span>
                                </NavLink>
                            ))}
                        </div>

                        <div className="mt-auto p-4 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 text-white shadow-xl shadow-purple-200 dark:shadow-none">
                            <p className="text-[10px] font-bold uppercase tracking-widest opacity-70 mb-1">Total Assets</p>
                            <p className="text-xl font-black">1,248 Items</p>
                            <div className="mt-3 w-full h-1 bg-white/20 rounded-full overflow-hidden">
                                <div className="w-[70%] h-full bg-white rounded-full" />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
