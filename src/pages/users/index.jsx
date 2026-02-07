import React from 'react';

const UsersPage = () => {
    const users = [
        { id: 1, name: 'Alex Thompson', email: 'alex@example.com', role: 'Admin', status: 'Active' },
        { id: 2, name: 'Sarah Miller', email: 'sarah@example.com', role: 'Editor', status: 'Inactive' },
        { id: 3, name: 'John Doe', email: 'john@example.com', role: 'Viewer', status: 'Active' },
        { id: 4, name: 'Emma Wilson', email: 'emma@example.com', role: 'Admin', status: 'Pending' },
    ];

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">User Management</h1>
                <button className="btn-primary">Add New User</button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-white/10">
                            <th className="pb-4 font-semibold text-slate-400">Name</th>
                            <th className="pb-4 font-semibold text-slate-400">Email</th>
                            <th className="pb-4 font-semibold text-slate-400">Role</th>
                            <th className="pb-4 font-semibold text-slate-400">Status</th>
                            <th className="pb-4 font-semibold text-slate-400 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                <td className="py-4 font-medium">{user.name}</td>
                                <td className="py-4 text-slate-400">{user.email}</td>
                                <td className="py-4">{user.role}</td>
                                <td className="py-4">
                                    <span className={`px-2 py-1 rounded-md text-xs font-bold ${user.status === 'Active' ? 'bg-emerald-500/20 text-emerald-400' :
                                            user.status === 'Pending' ? 'bg-amber-500/20 text-amber-400' : 'bg-slate-500/20 text-slate-400'
                                        }`}>
                                        {user.status}
                                    </span>
                                </td>
                                <td className="py-4 text-right">
                                    <button className="text-indigo-400 hover:text-indigo-300 font-medium">Edit</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UsersPage;
