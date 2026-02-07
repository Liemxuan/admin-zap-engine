import React from 'react';

const OrdersPage = () => {
    const orders = [
        { id: '#8901', customer: 'Global Tech', date: 'Oct 24, 2023', amount: '$1,200', status: 'Delivered' },
        { id: '#8902', customer: 'Nexus Corp', date: 'Oct 23, 2023', amount: '$450', status: 'Processing' },
        { id: '#8903', customer: 'Apex Ltd', date: 'Oct 22, 2023', amount: '$2,890', status: 'Shipped' },
        { id: '#8904', customer: 'Lumina Inc', date: 'Oct 22, 2023', amount: '$150', status: 'Delivered' },
    ];

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">Orders Tracking</h1>

            <div className="grid grid-cols-1 gap-4">
                {orders.map(order => (
                    <div key={order.id} className="bg-white/5 border border-white/5 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-indigo-600/20 flex items-center justify-center text-indigo-400 font-bold">
                                {order.id.replace('#', '')}
                            </div>
                            <div>
                                <h3 className="font-bold">{order.customer}</h3>
                                <p className="text-sm text-slate-500">{order.date}</p>
                            </div>
                        </div>

                        <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-2">
                            <span className="text-xl font-bold">{order.amount}</span>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${order.status === 'Delivered' ? 'bg-emerald-500/20 text-emerald-400' :
                                    order.status === 'Processing' ? 'bg-indigo-500/20 text-indigo-400' : 'bg-amber-500/20 text-amber-400'
                                }`}>
                                {order.status}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrdersPage;
