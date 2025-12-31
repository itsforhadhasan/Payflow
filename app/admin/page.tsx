import { Users, AlertTriangle, Activity, Database } from 'lucide-react';

export default function AdminDashboard() {
    return (
        <div className="space-y-8">
            <h2 className="text-3xl font-bold font-heading">System Overview</h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { label: 'Total Users', value: '15,240', icon: Users, color: 'text-blue-500' },
                    { label: 'Daily Volume', value: '৳ 2.4M', icon: Activity, color: 'text-green-500' },
                    { label: 'Settlement Balance', value: '৳ 50.0M', icon: Database, color: 'text-purple-500' },
                    { label: 'Suspicious Activities', value: '3', icon: AlertTriangle, color: 'text-red-500' },
                ].map((stat, i) => (
                    <div key={i} className="p-6 rounded-2xl bg-card border border-border shadow-sm flex items-center justify-between">
                        <div>
                            <p className="text-muted-foreground text-sm font-medium">{stat.label}</p>
                            <h3 className="text-2xl font-bold font-heading mt-1">{stat.value}</h3>
                        </div>
                        <div className={`w-12 h-12 rounded-full bg-accent flex items-center justify-center ${stat.color}`}>
                            <stat.icon className="w-6 h-6" />
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-card border border-border rounded-xl p-6">
                    <h3 className="font-bold text-lg mb-4">Pending Approvals (Agents)</h3>
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">A</div>
                                    <div>
                                        <p className="font-medium text-sm">Agent Applicant #{i}</p>
                                        <p className="text-xs text-muted-foreground">Applied 2h ago</p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button className="px-3 py-1.5 text-xs font-bold text-green-600 bg-green-100 rounded hover:bg-green-200">Approve</button>
                                    <button className="px-3 py-1.5 text-xs font-bold text-red-600 bg-red-100 rounded hover:bg-red-200">Reject</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-card border border-border rounded-xl p-6">
                    <h3 className="font-bold text-lg mb-4">System Alerts</h3>
                    <div className="space-y-2">
                        <div className="p-3 border-l-4 border-red-500 bg-red-50 dark:bg-red-900/10 text-sm">
                            <span className="font-bold">High Load Warning</span>: Database latency increased by 15% in last hour.
                        </div>
                        <div className="p-3 border-l-4 border-yellow-500 bg-yellow-50 dark:bg-yellow-900/10 text-sm">
                            <span className="font-bold">Suspicious Transaction</span>: User U-129 attempted 5 failed logins.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
