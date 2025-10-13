// API Service for Sales Activity Dashboard
const API_BASE_URL = 'https://b2b.olankatravels.com';
const API_KEY = '51ff47ea068f307f9ecaff25f079eaa9';

// Helper function to make API calls
const apiCall = async (endpoint, method = 'POST', body = null) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      },
      body: body ? JSON.stringify(body) : null,
    });

    if (!response.ok) {
      throw new Error(`API call failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API call error:', error);
    throw error;
  }
};

// 1. Fetch Assistant Managers
export const fetchAssistantManagers = async () => {
  return await apiCall('/api/assistant_managers');
};

// 2. Fetch Count of Payments and Pipelines
export const fetchCountOfPaymentsAndPipelines = async (assistantManagerId) => {
  return await apiCall('/api/count_of_payments_and_pipelines', 'POST', {
    assistant_manager_id: assistantManagerId
  });
};

// 3. Fetch Agents Under Assistant Manager
export const fetchAgentsUnderAssistantManager = async (assistantManagerId, activityFromDate, activityToDate, stateFromDate, stateToDate) => {
  return await apiCall('/api/agents_under_assistant_manager', 'POST', {
    assistant_manager_id: assistantManagerId,
    activity_from_date: activityFromDate,
    activity_to_date: activityToDate,
    state_from_date: stateFromDate,
    state_to_date: stateToDate
  });
};

// Helper function to format dates for API calls
export const formatDateForAPI = (date) => {
  return date.toISOString().split('T')[0];
};

// Helper function to get date ranges based on selected period
export const getDateRanges = (selectedPeriod) => {
  const today = new Date();
  const ranges = {
    'Last 2 Days': 2,
    'Last Week': 7,
    'Last Month': 30,
    'Last 6 Months': 180,
    '1 Year': 365
  };
  
  const days = ranges[selectedPeriod] || 7;
  const fromDate = new Date(today);
  fromDate.setDate(today.getDate() - days);
  
  return {
    activityFromDate: formatDateForAPI(fromDate),
    activityToDate: formatDateForAPI(today),
    stateFromDate: formatDateForAPI(fromDate),
    stateToDate: formatDateForAPI(today)
  };
};
