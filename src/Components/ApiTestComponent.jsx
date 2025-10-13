import React, { useState } from 'react';
import { fetchAssistantManagers, fetchAgentsUnderAssistantManager, getDateRanges } from '../services/apiService';
import { transformAgentData, calculateSummaryData } from '../utils/dataTransformers';

const ApiTestComponent = () => {
  const [testResults, setTestResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const runApiTest = async () => {
    setLoading(true);
    setError(null);
    setTestResults(null);

    try {
      // Test 1: Fetch Assistant Managers
      console.log('Testing Assistant Managers API...');
      const managersResponse = await fetchAssistantManagers();
      console.log('Assistant Managers Response:', managersResponse);

      if (managersResponse.success && managersResponse.data && managersResponse.data.length > 0) {
        const assistantManagerId = managersResponse.data[0].id;
        
        // Test 2: Fetch Agents Under Assistant Manager
        console.log('Testing Agents Under Assistant Manager API...');
        const dateRanges = getDateRanges('Last Week');
        const agentsResponse = await fetchAgentsUnderAssistantManager(
          assistantManagerId,
          dateRanges.activityFromDate,
          dateRanges.activityToDate,
          dateRanges.stateFromDate,
          dateRanges.stateToDate
        );
        console.log('Agents Response:', agentsResponse);

        if (agentsResponse.success && agentsResponse.data) {
          // Test 3: Transform Data
          console.log('Transforming data...');
          const transformedData = transformAgentData(agentsResponse.data);
          const summaryData = calculateSummaryData(transformedData);
          
          setTestResults({
            managers: managersResponse.data,
            agents: agentsResponse.data,
            transformedData: transformedData,
            summaryData: summaryData
          });
        } else {
          setError('Failed to fetch agents data: ' + (agentsResponse.message || 'Unknown error'));
        }
      } else {
        setError('Failed to fetch assistant managers: ' + (managersResponse.message || 'Unknown error'));
      }
    } catch (err) {
      console.error('API Test Error:', err);
      setError('API Test Failed: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg">
      <h2 className="text-xl font-bold mb-4">API Integration Test</h2>
      
      <button
        onClick={runApiTest}
        disabled={loading}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {loading ? 'Testing...' : 'Run API Test'}
      </button>

      {error && (
        <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          <strong>Error:</strong> {error}
        </div>
      )}

      {testResults && (
        <div className="mt-4 space-y-4">
          <div className="p-4 bg-green-100 border border-green-400 text-green-700 rounded">
            <strong>✅ API Test Successful!</strong>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white rounded border">
              <h3 className="font-bold mb-2">Assistant Managers ({testResults.managers.length})</h3>
              <ul className="text-sm">
                {testResults.managers.map((manager, index) => (
                  <li key={index}>ID: {manager.id}, Name: {manager.name}</li>
                ))}
              </ul>
            </div>

            <div className="p-4 bg-white rounded border">
              <h3 className="font-bold mb-2">Agents ({testResults.agents.length})</h3>
              <ul className="text-sm">
                {testResults.agents.slice(0, 3).map((agent, index) => (
                  <li key={index}>
                    {agent.first_name} - Calls: {agent.company_call_attempts || 0}
                  </li>
                ))}
                {testResults.agents.length > 3 && (
                  <li>... and {testResults.agents.length - 3} more</li>
                )}
              </ul>
            </div>
          </div>

          <div className="p-4 bg-white rounded border">
            <h3 className="font-bold mb-2">Transformed Data Sample</h3>
            <pre className="text-xs bg-gray-100 p-2 rounded overflow-auto">
              {JSON.stringify(testResults.transformedData[0], null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApiTestComponent;
