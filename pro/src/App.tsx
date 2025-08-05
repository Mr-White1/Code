import React, { useState } from 'react';
import LandingPage from './components/Landing/LandingPage';
import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';
import ResearcherDashboard from './components/Dashboard/ResearcherDashboard';
import CompanyDashboard from './components/Dashboard/CompanyDashboard';
import ProgramList from './components/Programs/ProgramList';
import ReportsList from './components/Reports/ReportsList';
import ReportSubmission from './components/Reports/ReportSubmission';
import { mockUser, mockCompanyUser } from './data/mockData';

function App() {
  const [showLanding, setShowLanding] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [userRole, setUserRole] = useState<'researcher' | 'company'>('researcher');
  
  const currentUser = userRole === 'researcher' ? mockUser : mockCompanyUser;

  const handleGetStarted = (role: 'researcher' | 'company') => {
    setUserRole(role);
    setShowLanding(false);
    setActiveTab('dashboard');
  };

  if (showLanding) {
    return <LandingPage onGetStarted={handleGetStarted} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return userRole === 'researcher' 
          ? <ResearcherDashboard user={currentUser} />
          : <CompanyDashboard user={currentUser} />;
      case 'programs':
        return <ProgramList />;
      case 'reports':
        return <ReportsList />;
      case 'submit':
        return <ReportSubmission />;
      case 'create-program':
        // This would be a program creation form for companies
        return <div className="text-center py-12">
          <h2 className="text-xl font-semibold text-gray-900">Create Program</h2>
          <p className="text-gray-600 mt-2">Program creation form would be implemented here</p>
        </div>;
      default:
        return <ResearcherDashboard user={currentUser} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar user={currentUser} activeTab={activeTab} onTabChange={setActiveTab} />
      
      <div className="flex-1 flex flex-col">
        <Header />
        
        <main className="flex-1 p-6">
          {/* User Role Toggle for Demo */}
          <div className="mb-6">
            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setShowLanding(true)}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
                  >
                    ← Back to Landing
                  </button>
                  <span className="text-sm font-medium text-gray-700">Demo Mode - Switch User Role:</span>
                </div>
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => {
                      setUserRole('researcher');
                      setActiveTab('dashboard');
                    }}
                    className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                      userRole === 'researcher'
                        ? 'bg-white text-blue-600 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Security Researcher
                  </button>
                  <button
                    onClick={() => {
                      setUserRole('company');
                      setActiveTab('dashboard');
                    }}
                    className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                      userRole === 'company'
                        ? 'bg-white text-blue-600 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Company
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default App;