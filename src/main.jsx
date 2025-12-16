import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Polish from './pages/Polish.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Main route - simplified learning version */}
        <Route path="/" element={<App />} />
        {/* Polished version with all visual effects */}
        <Route path="/polish" element={<Polish />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
