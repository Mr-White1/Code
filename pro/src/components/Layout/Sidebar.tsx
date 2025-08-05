import React from 'react';
import { Bug, Home, FileText, Trophy, Settings, LogOut, Building } from 'lucide-react';
import { User } from '../../types';

interface SidebarProps {
  user: User;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ user, activeTab, onTabChange }) => {
  const researcherNavItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'programs', label: 'Programs', icon: Trophy },
    { id: 'reports', label: 'My Reports', icon: FileText },
    { id: 'submit', label: 'Submit Report', icon: Bug },
  ];

  const companyNavItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'programs', label: 'My Programs', icon: Building },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'create-program', label: 'Create Program', icon: Trophy },
  ];

  const navItems = user.role === 'researcher' ? researcherNavItems : companyNavItems;

  return (
    <div className="w-64 bg-white border-r border-gray-200 min-h-screen">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Bug className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">BugHunter</h1>
            <p className="text-sm text-gray-500">Security Platform</p>
          </div>
        </div>
      </div>

      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-gray-700">
              {user.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div>
            <p className="font-medium text-gray-900">{user.name}</p>
            <p className="text-sm text-gray-500 capitalize">{user.role}</p>
          </div>
        </div>
        
        {user.role === 'researcher' && (
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="text-center">
              <p className="text-lg font-bold text-green-600">${user.totalEarnings?.toLocaleString()}</p>
              <p className="text-xs text-gray-500">Total Earned</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-blue-600">{user.reputation}/5.0</p>
              <p className="text-xs text-gray-500">Reputation</p>
            </div>
          </div>
        )}
      </div>

      <nav className="p-4">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <button
                  onClick={() => onTabChange(item.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                    activeTab === item.id
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="absolute bottom-4 left-4 right-4">
        <div className="border-t border-gray-200 pt-4">
          <button className="w-full flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
            <Settings className="w-5 h-5" />
            <span className="font-medium">Settings</span>
          </button>
          <button className="w-full flex items-center space-x-3 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors mt-2">
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;