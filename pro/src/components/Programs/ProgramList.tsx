import React from 'react';
import { mockBountyPrograms } from '../../data/mockData';
import { Users, DollarSign, Calendar, Shield } from 'lucide-react';

const ProgramList: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Bug Bounty Programs</h1>
        <p className="text-gray-600">Discover active security programs and start hunting for vulnerabilities</p>
      </div>

      <div className="flex space-x-4">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          All Programs
        </button>
        <button className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
          Web Applications
        </button>
        <button className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
          Mobile Apps
        </button>
        <button className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
          APIs
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {mockBountyPrograms.map((program) => (
          <div key={program.id} className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{program.name}</h3>
                  <p className="text-gray-600 text-sm mt-1">{program.company}</p>
                </div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  program.status === 'active' ? 'bg-green-100 text-green-800' :
                  program.status === 'paused' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {program.status.charAt(0).toUpperCase() + program.status.slice(1)}
                </span>
              </div>
              <p className="text-gray-700 mt-3">{program.description}</p>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{program.totalResearchers} researchers</span>
                </div>
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">${program.totalBounties.toLocaleString()} paid</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">Since {program.createdAt}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{program.scope.length} scope items</span>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Reward Ranges</h4>
                <div className="grid grid-cols-4 gap-2">
                  <div className="text-center p-2 bg-red-50 rounded-lg">
                    <p className="text-xs text-red-600 font-medium">Critical</p>
                    <p className="text-sm font-bold text-red-700">${program.rewards.critical.toLocaleString()}</p>
                  </div>
                  <div className="text-center p-2 bg-orange-50 rounded-lg">
                    <p className="text-xs text-orange-600 font-medium">High</p>
                    <p className="text-sm font-bold text-orange-700">${program.rewards.high.toLocaleString()}</p>
                  </div>
                  <div className="text-center p-2 bg-yellow-50 rounded-lg">
                    <p className="text-xs text-yellow-600 font-medium">Medium</p>
                    <p className="text-sm font-bold text-yellow-700">${program.rewards.medium.toLocaleString()}</p>
                  </div>
                  <div className="text-center p-2 bg-green-50 rounded-lg">
                    <p className="text-xs text-green-600 font-medium">Low</p>
                    <p className="text-sm font-bold text-green-700">${program.rewards.low.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                View Program Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgramList;