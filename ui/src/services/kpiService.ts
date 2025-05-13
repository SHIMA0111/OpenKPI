import { v4 as uuidv4 } from 'uuid';

// Define KPI type
export interface KPI {
  id: string;
  userId: string;
  title: string;
  type: 'bar' | 'line' | 'pie';
  data: {
    labels: string[];
    values: number[];
  };
}

// Mock KPI data for different users
const mockKPIs: KPI[] = [
  // User 1 KPIs
  {
    id: uuidv4(),
    userId: '1', // This will be replaced with actual user IDs
    title: 'Sales Performance',
    type: 'bar',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
      values: [65, 59, 80, 81, 56],
    },
  },
  {
    id: uuidv4(),
    userId: '1',
    title: 'Customer Satisfaction',
    type: 'pie',
    data: {
      labels: ['Very Satisfied', 'Satisfied', 'Neutral', 'Dissatisfied'],
      values: [45, 25, 20, 10],
    },
  },
  
  // User 2 KPIs
  {
    id: uuidv4(),
    userId: '2',
    title: 'Marketing ROI',
    type: 'line',
    data: {
      labels: ['Q1', 'Q2', 'Q3', 'Q4'],
      values: [12, 19, 15, 22],
    },
  },
  {
    id: uuidv4(),
    userId: '2',
    title: 'Website Traffic',
    type: 'bar',
    data: {
      labels: ['Organic', 'Direct', 'Referral', 'Social', 'Email'],
      values: [35, 25, 15, 20, 5],
    },
  },
  
  // Admin KPIs
  {
    id: uuidv4(),
    userId: '3',
    title: 'Company Revenue',
    type: 'line',
    data: {
      labels: ['2019', '2020', '2021', '2022', '2023'],
      values: [100, 120, 90, 150, 180],
    },
  },
  {
    id: uuidv4(),
    userId: '3',
    title: 'Department Budget Allocation',
    type: 'pie',
    data: {
      labels: ['Marketing', 'Sales', 'R&D', 'Operations', 'HR'],
      values: [30, 25, 20, 15, 10],
    },
  },
  {
    id: uuidv4(),
    userId: '3',
    title: 'Employee Productivity',
    type: 'bar',
    data: {
      labels: ['Team A', 'Team B', 'Team C', 'Team D'],
      values: [85, 75, 90, 80],
    },
  },
];

// Initialize KPIs with user IDs from mock users
export const initializeKPIs = (userIds: string[]) => {
  // Replace placeholder user IDs with actual IDs
  mockKPIs.forEach((kpi, index) => {
    if (index < 2) {
      kpi.userId = userIds[0]; // First two KPIs for user1
    } else if (index < 4) {
      kpi.userId = userIds[1]; // Next two KPIs for user2
    } else {
      kpi.userId = userIds[2]; // Remaining KPIs for admin
    }
  });
};

// Get KPIs for a specific user
export const getUserKPIs = (userId: string): KPI[] => {
  return mockKPIs.filter(kpi => kpi.userId === userId);
};

// Add a new KPI for a user
export const addKPI = (kpi: Omit<KPI, 'id'>): KPI => {
  const newKPI: KPI = {
    ...kpi,
    id: uuidv4(),
  };
  mockKPIs.push(newKPI);
  return newKPI;
};

// Delete a KPI
export const deleteKPI = (id: string): boolean => {
  const initialLength = mockKPIs.length;
  const index = mockKPIs.findIndex(kpi => kpi.id === id);
  
  if (index !== -1) {
    mockKPIs.splice(index, 1);
    return mockKPIs.length < initialLength;
  }
  
  return false;
};

// Get all KPIs (admin only)
export const getAllKPIs = (): KPI[] => {
  return [...mockKPIs];
};