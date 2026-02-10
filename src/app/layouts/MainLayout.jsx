import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { useStore } from '../../store';
import { Sidebar } from '../../components/organisms/Sidebar';
import { DashboardHeader } from '../../components/organisms/DashboardHeader';
import useAppStore from '../../stores/useAppStore';
import '../../styles/common/layout.css';

const MainLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
    const location = useLocation();
    const navigate = useNavigate();
    const logout = useAppStore(state => state.logout);

    const theme = useStore(state => state.computedTheme);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="layout-container flex h-screen overflow-hidden bg-[#F8FAFC] dark:bg-slate-950">
            {/* Sidebar Component */}
            <Sidebar
                isExpanded={isSidebarOpen}
                onToggle={(val) => setIsSidebarOpen(val !== undefined ? val : !isSidebarOpen)}
                themeState={theme}
                onLogout={handleLogout}
            />

            {/* Main Content */}
            <main className="flex-1 flex flex-col h-full overflow-hidden">
                <DashboardHeader
                    onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    onLogout={handleLogout}
                />

                <div className="page-wrapper flex-1 overflow-y-auto px-8 pb-8">
                    <div className="page-card min-h-full bg-white dark:bg-slate-900/50 backdrop-blur-sm rounded-[2.5rem] p-10 shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-slate-100 dark:border-slate-800 animate-fade-in">
                        <Outlet />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default MainLayout;
