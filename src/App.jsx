import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Notes from './pages/Notes'
import Tools from './pages/Tools'
import Blog from './pages/Blog'
import AIChat from './pages/AIChat' // New AI Chat page
import './styles/global.css'

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/ai-chat" element={<AIChat />} /> {/* New route */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
