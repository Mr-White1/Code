export interface User {
  id: string;
  name: string;
  email: string;
  role: 'researcher' | 'company' | 'admin';
  avatar?: string;
  reputation?: number;
  totalEarnings?: number;
  joinDate: string;
}

export interface BugReport {
  id: string;
  title: string;
  description: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  status: 'submitted' | 'triaged' | 'accepted' | 'resolved' | 'rejected';
  reward: number;
  submittedBy: string;
  submittedTo: string;
  programId: string;
  submittedAt: string;
  resolvedAt?: string;
  attachments?: string[];
}

export interface BountyProgram {
  id: string;
  name: string;
  company: string;
  description: string;
  scope: string[];
  rewards: {
    critical: number;
    high: number;
    medium: number;
    low: number;
  };
  status: 'active' | 'paused' | 'ended';
  totalBounties: number;
  totalResearchers: number;
  createdAt: string;
}

export interface Stats {
  totalReports: number;
  totalRewards: number;
  activePrograms: number;
  researchers: number;
}