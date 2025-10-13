# Sales Activity Dashboard - API Integration

## Overview
This document describes the API integration for the Sales Activity Dashboard, which connects the UI components to the backend API endpoints for real-time data display.

## API Endpoints

### 1. Assistant Managers
- **Endpoint**: `POST /api/assistant_managers`
- **Purpose**: Fetches list of all assistant managers
- **Authorization**: Bearer token required
- **Response**: List of assistant managers with ID and name

### 2. Count of Payments and Pipelines
- **Endpoint**: `POST /api/count_of_payments_and_pipelines`
- **Purpose**: Gets payment and pipeline counts for agents under an assistant manager
- **Authorization**: Bearer token required
- **Parameters**: `assistant_manager_id`
- **Response**: Date-based payment and pipeline counts

### 3. Agents Under Assistant Manager
- **Endpoint**: `POST /api/agents_under_assistant_manager`
- **Purpose**: Fetches detailed agent data including activity metrics
- **Authorization**: Bearer token required
- **Parameters**: 
  - `assistant_manager_id`
  - `activity_from_date`
  - `activity_to_date`
  - `state_from_date`
  - `state_to_date`

## Data Mapping

### UI Components to API Fields

#### Agent Information
- `first_name` → Agent name display
- `image` → Agent profile picture
- `last_sale_date` → Last sale date (if available)

#### Calls Section
- `company_call_attempts` → Top-left red circle
- `company_call_success` → Top-right blue circle  
- `agent_call_attempts` → Bottom-left red circle
- `agent_call_success` → Bottom-right green circle

#### PKG Sends Section
- `pkg_sends_total` → Top blue circle
- `pkg_sends_agent` → Bottom blue circle

#### WhatsApp Section
- `company_whatsapp_attempts` → Top-left red circle
- `company_whatsapp_success` → Top-right green circle
- `agent_whatsapp_attempts` → Bottom-left red circle
- `agent_whatsapp_success` → Bottom-right green circle

#### New Section
- `new_enquiries_total` → Top green circle
- `new_enquiries_agent` → Bottom green circle

#### Email Section
- `company_email_attempts` → Top-left red circle
- `company_email_success` → Top-right green circle
- `agent_email_attempts` → Bottom-left red circle
- `agent_email_success` → Bottom-right green circle

## Implementation Details

### Files Created/Modified

1. **`src/services/apiService.js`**
   - API service functions
   - Authentication handling
   - Error handling
   - Date range utilities

2. **`src/utils/dataTransformers.js`**
   - Data transformation functions
   - UI data structure mapping
   - Summary calculations
   - Badge color logic

3. **`src/Components/CommunicationTable/CommunicationTablePage.jsx`**
   - Updated to use real API data
   - Loading and error states
   - Period-based data fetching

4. **`src/Components/ApiTestComponent.jsx`**
   - Test component for API integration
   - Debugging and validation

### Configuration

#### API Base URL
Update the `API_BASE_URL` in `src/services/apiService.js`:
```javascript
const API_BASE_URL = 'https://your-actual-api-url.com';
```

#### Authorization
The API key is already configured:
```javascript
const API_KEY = '51ff47ea068f307f9ecaff25f079eaa9';
```

### Usage

#### Basic Usage
The `CommunicationTable` component automatically fetches data when mounted:

```jsx
<CommunicationTable selectedPeriod="Last Week" />
```

#### With Custom Data
You can also pass custom data:

```jsx
<CommunicationTable 
  data={customData} 
  summaryData={customSummaryData}
  selectedPeriod="Last Month"
/>
```

#### Testing
Use the `ApiTestComponent` to test API connectivity:

```jsx
import ApiTestComponent from './Components/ApiTestComponent';

// Add to your component
<ApiTestComponent />
```

## Error Handling

The integration includes comprehensive error handling:

1. **Network Errors**: API call failures
2. **Authentication Errors**: Invalid API key
3. **Data Errors**: Invalid response format
4. **Loading States**: User feedback during data fetching

## Data Flow

1. Component mounts → Fetch assistant managers
2. Assistant manager selected → Fetch agents data
3. API response → Transform to UI format
4. UI updates → Display real-time data
5. Period change → Refetch with new date range

## Fallback Behavior

- If API fails, component falls back to mock data
- Missing fields default to 0
- Loading states provide user feedback
- Error states show helpful messages

## Testing

1. **Unit Tests**: Test data transformation functions
2. **Integration Tests**: Test API service functions
3. **UI Tests**: Test component behavior with real data
4. **Manual Testing**: Use ApiTestComponent for debugging

## Future Enhancements

1. **Caching**: Implement data caching for better performance
2. **Real-time Updates**: WebSocket integration for live data
3. **Pagination**: Handle large datasets
4. **Filtering**: Advanced filtering options
5. **Export**: Data export functionality

## Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure API server allows cross-origin requests
2. **Authentication**: Verify API key is correct
3. **Date Format**: Ensure dates are in YYYY-MM-DD format
4. **Network**: Check API server availability

### Debug Steps

1. Check browser console for errors
2. Use ApiTestComponent to test individual endpoints
3. Verify API responses in Network tab
4. Check data transformation in console logs

## Support

For issues or questions regarding the API integration, please check:
1. This documentation
2. Browser console for error messages
3. Network tab for API call details
4. Component state in React DevTools
