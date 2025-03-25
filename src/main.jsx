import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import LoginPage from './Pages/Auth/LoginPage.jsx'
import Dashboard from './Pages/Admin/Dashboard.jsx'
import AppRoutes from './AppRoutes.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppRoutes />
  </StrictMode>
)
