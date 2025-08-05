import React from 'react';
import { Shield, Users, FileText, DollarSign } from 'lucide-react';
import StatsCard from './StatsCard';
import { mockBountyPrograms, mockBugReports } from '../../data/mockData';
import { User } from '../../types';

interface CompanyDashboardProps {
  user: User;
}

const CompanyDashboard: React.FC<CompanyDashboardProps> = ({ user }) => {
  const companyPrograms = mockBountyPrograms.filter(program => 
    program.company === user.name
  );
  
  const companyReports = mockBugReports.filter(report => 
    report.submittedTo === user.name
  );

  const totalBounties = companyPrograms.reduce((sum, program) => sum + program.totalBounties, 0);
  const totalResearchers = companyPrograms.reduce((sum, program) => sum + program.totalResearchers, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Security Dashboard</h1>
        <p className="text-gray-600">Monitor your bug bounty programs and security reports</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Active Programs"
          value={companyPrograms.length}
          icon={Shield}
          color="blue"
        />
        <StatsCard
          title="Total Reports"
          value={companyReports.length}
          icon={FileText}
          color="purple"
        />
        <StatsCard
          title="Researchers"
          value={totalResearchers}
          icon={Users}
          color="green"
        />
        <StatsCard
          title="Total Paid"
          value={totalBounties}
          icon={DollarSign}
          color="orange"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Recent Reports</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {companyReports.map((report) => (
                <div key={report.id} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                  <div className={`w-3 h-3 rounded-full mt-2 ${
                    report.severity === 'critical' ? 'bg-red-500' :
                    report.severity === 'high' ? 'bg-orange-500' :
                    report.severity === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                  }`} />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{report.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      By {report.submittedBy} • ${report.reward.toLocaleString()}
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
            <h2 className="text-lg font-semibold text-gray-900">Program Performance</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {companyPrograms.slice(0, 3).map((program) => (
                <div key={program.id} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-gray-900">{program.name}</h3>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      program.status === 'active' ? 'bg-green-100 text-green-800' :
                      program.status === 'paused' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {program.status.charAt(0).toUpperCase() + program.status.slice(1)}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Researchers:</span>
                      <span className="font-medium text-gray-900 ml-1">{program.totalResearchers}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Total Paid:</span>
                      <span className="font-medium text-gray-900 ml-1">${program.totalBounties.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDashboard;