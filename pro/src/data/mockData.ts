import { User, BugReport, BountyProgram, Stats } from '../types';

export const mockUser: User = {
  id: '1',
  name: 'Alex Thompson',
  email: 'alex@example.com',
  role: 'researcher',
  reputation: 4.8,
  totalEarnings: 15750,
  joinDate: '2023-01-15'
};

export const mockCompanyUser: User = {
  id: '2',
  name: 'TechCorp Security',
  email: 'security@techcorp.com',
  role: 'company',
  joinDate: '2022-08-10'
};

export const mockBugReports: BugReport[] = [
  {
    id: '1',
    title: 'SQL Injection in User Search',
    description: 'Found a SQL injection vulnerability in the user search functionality that allows unauthorized data access.',
    severity: 'critical',
    status: 'accepted',
    reward: 2500,
    submittedBy: 'Alex Thompson',
    submittedTo: 'TechCorp',
    programId: '1',
    submittedAt: '2024-12-10',
    resolvedAt: '2024-12-12'
  },
  {
    id: '2',
    title: 'Cross-Site Scripting (XSS) in Comments',
    description: 'Stored XSS vulnerability in the comment section allows malicious script execution.',
    severity: 'high',
    status: 'triaged',
    reward: 1200,
    submittedBy: 'Alex Thompson',
    submittedTo: 'WebApp Inc',
    programId: '2',
    submittedAt: '2024-12-08'
  },
  {
    id: '3',
    title: 'Broken Authentication in Mobile App',
    description: 'Authentication bypass vulnerability in the mobile application login process.',
    severity: 'high',
    status: 'submitted',
    reward: 1500,
    submittedBy: 'Alex Thompson',
    submittedTo: 'MobileFirst',
    programId: '3',
    submittedAt: '2024-12-05'
  }
];

export const mockBountyPrograms: BountyProgram[] = [
  {
    id: '1',
    name: 'TechCorp Web Security',
    company: 'TechCorp',
    description: 'Find vulnerabilities in our main web application and API endpoints.',
    scope: ['*.techcorp.com', 'api.techcorp.com', 'mobile.techcorp.com'],
    rewards: {
      critical: 2500,
      high: 1200,
      medium: 500,
      low: 100
    },
    status: 'active',
    totalBounties: 45200,
    totalResearchers: 127,
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    name: 'WebApp Security Program',
    company: 'WebApp Inc',
    description: 'Comprehensive security testing for our SaaS platform.',
    scope: ['*.webapp.com', 'admin.webapp.com'],
    rewards: {
      critical: 3000,
      high: 1500,
      medium: 600,
      low: 150
    },
    status: 'active',
    totalBounties: 67800,
    totalResearchers: 89,
    createdAt: '2024-02-20'
  },
  {
    id: '3',
    name: 'Mobile Security Challenge',
    company: 'MobileFirst',
    description: 'Security testing for our iOS and Android applications.',
    scope: ['Mobile apps only'],
    rewards: {
      critical: 2000,
      high: 1000,
      medium: 400,
      low: 80
    },
    status: 'active',
    totalBounties: 23400,
    totalResearchers: 56,
    createdAt: '2024-03-10'
  }
];

export const mockStats: Stats = {
  totalReports: 1247,
  totalRewards: 2850000,
  activePrograms: 34,
  researchers: 5672
};