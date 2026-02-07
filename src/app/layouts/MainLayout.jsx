import React from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, ShoppingCart, LogOut, Menu, Zap } from 'lucide-react';
import useAppStore from '../../stores/useAppStore';
import '../../styles/common/layout.css';

const MainLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
    const location = useLocation();
    const navigate = useNavigate();
    const logout = useAppStore(state => state.logout);

    const menuItems = [
        { name: 'Dashboard', path: '/', icon: LayoutDashboard },
        { name: 'Users', path: '/users', icon: Users },
        { name: 'Orders', path: '/orders', icon: ShoppingCart },
    ];

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="layout-container">
            {/* Sidebar */}
            <aside className={`sidebar ${isSidebarOpen ? 'sidebar-expanded' : 'sidebar-collapsed'}`}>
                <div className="sidebar-logo">
                    <div className="logo-icon">
                        <Zap size={24} fill="white" />
                    </div>
                    {isSidebarOpen && <h1 className="font-bold text-xl">Zap Admin</h1>}
                </div>

                <nav className="nav-menu">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`nav-link ${isActive ? 'active' : ''}`}
                            >
                                <Icon size={22} />
                                {isSidebarOpen && <span>{item.name}</span>}
                            </Link>
                        );
                    })}
                </nav>

                <div className="logout-container">
                    <button onClick={handleLogout} className="btn-logout">
                        <LogOut size={22} />
                        {isSidebarOpen && <span>Logout</span>}
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="main-content">
                <header className="header">
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="btn-menu"
                    >
                        <Menu size={20} />
                    </button>

                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200">
                            <span className="text-sm font-bold text-slate-600">AD</span>
                        </div>
                    </div>
                </header>

                <div className="page-wrapper">
                    <div className="page-card animate-fade-in">
                        <Outlet />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default MainLayout;
