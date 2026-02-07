import React from 'react';
import '../../styles/dashboard/dashboard.css';

const DashboardPage = () => {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-10">Dashboard Overview</h1>
            <div className="stats-grid">
                {[
                    { label: 'Total Revenue', value: '$24,560', change: '+12%', color: 'text-emerald-500' },
                    { label: 'Total Orders', value: '1,240', change: '+5%', color: 'text-indigo-500' },
                    { label: 'Active Users', value: '892', change: '+18%', color: 'text-amber-500' },
                ].map((stat, i) => (
                    <div key={i} className="stat-card">
                        <p className="stat-label">{stat.label}</p>
                        <h2 className="stat-value">{stat.value}</h2>
                        <span className={`stat-change ${stat.color}`}>{stat.change} increase</span>
                    </div>
                ))}
            </div>

            <div className="activity-list">
                <h2 className="text-xl font-bold mb-6">Recent Activity</h2>
                <div className="space-y-2">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="activity-item">
                            <div className="activity-info">
                                <div className="activity-avatar" />
                                <div>
                                    <p className="font-bold text-slate-800">User Activity #{i}</p>
                                    <p className="text-xs text-muted">2 hours ago</p>
                                </div>
                            </div>
                            <button className="text-xs text-indigo-600 font-bold hover:underline">View Detail</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
