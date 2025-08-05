import React from 'react';
import { DollarSign, FileText, Trophy, TrendingUp } from 'lucide-react';
import StatsCard from './StatsCard';
import { mockBugReports } from '../../data/mockData';
import { User } from '../../types';

interface ResearcherDashboardProps {
  user: User;
}

const ResearcherDashboard: React.FC<ResearcherDashboardProps> = ({ user }) => {
  const recentReports = mockBugReports.slice(0, 3);
  const totalReports = mockBugReports.length;
  const acceptedReports = mockBugReports.filter(report => report.status === 'accepted').length;

  // Calculate acceptance rate safely to avoid division by zero
  const acceptanceRate = totalReports > 0 ? Math.round((acceptedReports / totalReports) * 100) : 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user.name.split(' ')[0]}!</h1>
        <p className="text-gray-600">Here's your security research activity overview</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Earnings"
          value={user.totalEarnings || 0}
          icon={DollarSign}
          color="green"
          trend={{ value: 12, label: "from last month" }}
        />
        <StatsCard
          title="Reports Submitted"
          value={totalReports}
          icon={FileText}
          color="blue"
          trend={{ value: 8, label: "from last month" }}
        />
        <StatsCard
          title="Acceptance Rate"
          value={`${acceptanceRate}%`}
          icon={Trophy}
          color="purple"
          trend={{ value: 5, label: "from last month" }}
        />
        <StatsCard
          title="Reputation Score"
          value={`${user.reputation}/5.0`}
          icon={TrendingUp}
          color="orange"
          trend={{ value: 2, label: "from last month" }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Recent Reports</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentReports.map((report) => (
                <div key={report.id} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                  <div className={`w-3 h-3 rounded-full mt-2 ${
                    report.severity === 'critical' ? 'bg-red-500' :
                    report.severity === 'high' ? 'bg-orange-500' :
                    report.severity === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                  }`} />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{report.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {report.submittedTo} • ${report.reward.toLocaleString()}
                    </p>
                    <div className="flex items-center space-x-4 mt-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        report.status === 'accepted' ? 'bg-green-100 text-green-800' :
                        report.status === 'triaged' ? 'bg-blue-100 text-blue-800' :
                        report.status === 'submitted' ? 'bg-gray-100 text-gray-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                      </span>
                      <span className="text-xs text-gray-500">{report.submittedAt}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Earnings This Month</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Critical Vulnerabilities</span>
                <span className="font-semibold text-gray-900">$5,000</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">High Severity</span>
                <span className="font-semibold text-gray-900">$2,400</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Medium Severity</span>
                <span className="font-semibold text-gray-900">$1,000</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Low Severity</span>
                <span className="font-semibold text-gray-900">$300</span>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-900">Total</span>
                  <span className="font-bold text-green-600 text-lg">$8,700</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResearcherDashboard;