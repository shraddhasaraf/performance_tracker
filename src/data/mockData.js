// Mock data for the application

export const users = {
  'hr@company.com': {
    id: 'hr1',
    email: 'hr@company.com',
    password: 'password',
    role: 'hr',
    name: 'Sarah Wilson',
    avatar: 'SW'
  },
  'manager@company.com': {
    id: 'mgr1',
    email: 'manager@company.com',
    password: 'password',
    role: 'manager',
    name: 'Marcus Rodriguez',
    avatar: 'MR'
  },
  'employee@company.com': {
    id: 'emp1',
    email: 'employee@company.com',
    password: 'password',
    role: 'employee',
    name: 'Alicia Brown',
    avatar: 'AB',
    team: 'Research',
    manager: 'Marcus Rodriguez'
  }
};

export const teams = {
  Research: {
    name: 'Research',
    employees: [
      {
        id: 'emp1',
        name: 'Alicia Brown',
        avatar: 'AB',
        email: 'alicia@company.com',
        manager: 'Marcus Rodriguez',
        progress: 75
      },
      {
        id: 'emp2',
        name: 'John Lee',
        avatar: 'JL',
        email: 'john@company.com',
        manager: 'Marcus Rodriguez',
        progress: 82
      }
    ]
  },
  Design: {
    name: 'Design',
    employees: [
      {
        id: 'emp3',
        name: 'Priya Singh',
        avatar: 'PS',
        email: 'priya@company.com',
        manager: 'Marcus Rodriguez',
        progress: 68
      },
      {
        id: 'emp4',
        name: 'Emma Chen',
        avatar: 'EC',
        email: 'emma@company.com',
        manager: 'Marcus Rodriguez',
        progress: 91
      }
    ]
  },
  Engineering: {
    name: 'Engineering',
    employees: [
      {
        id: 'emp5',
        name: 'David Kim',
        avatar: 'DK',
        email: 'david@company.com',
        manager: 'Marcus Rodriguez',
        progress: 55
      },
      {
        id: 'emp6',
        name: 'Lisa Anderson',
        avatar: 'LA',
        email: 'lisa@company.com',
        manager: 'Marcus Rodriguez',
        progress: 78
      }
    ]
  },
  Analytics: {
    name: 'Analytics',
    employees: [
      {
        id: 'emp7',
        name: 'Michael Johnson',
        avatar: 'MJ',
        email: 'michael@company.com',
        manager: 'Marcus Rodriguez',
        progress: 63
      }
    ]
  }
};

export const goals = {
  emp1: [
    {
      id: 'goal1',
      title: 'Complete Q3 Research Analysis',
      status: 'on-track',
      progress: 75
    },
    {
      id: 'goal2',
      title: 'Prepare Quarterly Presentation',
      status: 'needs-attention',
      progress: 60
    },
    {
      id: 'goal3',
      title: 'Mentor Junior Researchers',
      status: 'on-track',
      progress: 85
    }
  ]
};

export const feedback = {
  emp1: [
    {
      id: 'fb1',
      month: 'August 2024',
      managerFeedback: {
        author: 'Marcus Rodriguez',
        date: '2024-08-30',
        content: 'Alicia has shown excellent progress on the research analysis. Her attention to detail and analytical skills continue to impress. The quarterly presentation preparation needs some attention - recommend focusing on storytelling aspects.',
        goals: {
          goal1: { status: 'on-track', feedback: 'Great analytical work and attention to detail.' },
          goal2: { status: 'needs-attention', feedback: 'Focus more on storytelling and visual presentation.' },
          goal3: { status: 'on-track', feedback: 'Excellent mentoring skills, junior team members appreciate guidance.' }
        }
      },
      employeeFeedback: {
        author: 'Alicia Brown',
        date: '2024-08-28',
        content: 'I feel confident about the research analysis progress. However, I would appreciate more guidance on presentation skills and potentially some training resources for public speaking.',
        goals: {
          goal1: { status: 'on-track', feedback: 'Making good progress, enjoying the analytical challenges.' },
          goal2: { status: 'needs-attention', feedback: 'Could use more support with presentation design and delivery.' },
          goal3: { status: 'on-track', feedback: 'Really enjoying mentoring, learning a lot from teaching others.' }
        },
        healthCheck: {
          enjoyWork: 4,
          managerSupport: true,
          blockers: 'Would like access to presentation training resources.'
        }
      }
    },
    {
      id: 'fb2',
      month: 'July 2024',
      managerFeedback: {
        author: 'Marcus Rodriguez',
        date: '2024-07-31',
        content: 'Strong month for Alicia. Research methodology improvements have been particularly noteworthy. Continue current trajectory.',
        goals: {
          goal1: { status: 'on-track', feedback: 'Methodology improvements are excellent.' },
          goal2: { status: 'on-track', feedback: 'Good progress on initial presentation planning.' },
          goal3: { status: 'on-track', feedback: 'Natural mentor, very supportive of team.' }
        }
      },
      employeeFeedback: {
        author: 'Alicia Brown',
        date: '2024-07-29',
        content: 'Feeling good about work direction. The new research methodology is working well and I feel supported by the team.',
        goals: {
          goal1: { status: 'on-track', feedback: 'New methodology is much more efficient.' },
          goal2: { status: 'on-track', feedback: 'Starting to outline presentation structure.' },
          goal3: { status: 'on-track', feedback: 'Enjoying the mentoring aspect of my role.' }
        },
        healthCheck: {
          enjoyWork: 5,
          managerSupport: true,
          blockers: 'None at this time.'
        }
      }
    }
  ]
};

export const aiSummaries = {
  emp1: {
    managerSummary: 'Marcus consistently recognizes Alicia\'s strong analytical skills and attention to detail. He has identified presentation skills as an area for development and recommends additional support. Overall trajectory is positive with specific guidance on professional development areas.',
    employeeSummary: 'Alicia demonstrates high job satisfaction and feels well-supported by her manager. She actively seeks professional development opportunities, particularly in presentation skills. She values the mentoring aspects of her role and shows strong self-awareness about her development needs.'
  }
};

// Helper functions
export const getEmployeeById = (id) => {
  for (const team of Object.values(teams)) {
    const employee = team.employees.find(emp => emp.id === id);
    if (employee) return employee;
  }
  return null;
};

export const getAllEmployees = () => {
  return Object.values(teams).flatMap(team => team.employees);
};

export const getEmployeesByTeam = (teamName) => {
  return teams[teamName]?.employees || [];
};

export const getFeedbackForEmployee = (employeeId) => {
  return feedback[employeeId] || [];
};

export const getGoalsForEmployee = (employeeId) => {
  return goals[employeeId] || [];
};

export const getAISummaryForEmployee = (employeeId) => {
  return aiSummaries[employeeId] || {
    managerSummary: 'No feedback summary available yet.',
    employeeSummary: 'No feedback summary available yet.'
  };
};

