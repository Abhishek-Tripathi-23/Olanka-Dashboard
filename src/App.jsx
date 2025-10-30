import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import './index.css'

import { CombinedPage } from './Components/CombinedPage'
import LoginPage from './Components/Auth/LoginPage'
import ProtectedRoute from './Components/Auth/ProtectedRoute'

function App() {
  return (
    <Routes>
      {/* Redirect root to dashboard */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      {/* Login route */}
      <Route path="/login" element={<LoginPage />} />

      {/* Protected dashboard route */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <div className='bg-[#F0DCE3] min-h-screen'>
              <CombinedPage />
            </div>
          </ProtectedRoute>
        }
      />

      {/* Catch all route - redirect to login */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default App
