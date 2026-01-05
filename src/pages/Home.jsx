import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Your Ultimate Study Companion</h1>
        <p className="page-subtitle">
          Free SSC & HSC notes, study tools, and resources to help you excel in your exams. 
          Download PDFs, use our tools, and boost your academic performance!
        </p>
      </div>
      
      <div className="card-grid">
        {/* Quality Notes Section - Links to Notes Page */}
        <Link to="/notes" className="resource-card">
          <div className="card-icon">📚</div>
          <h3 className="card-title">Quality Notes</h3>
          <p className="card-description">
            Curated notes by subject experts covering entire syllabus
          </p>
        </Link>
        
        {/* Smart Tools Section - Links to Tools Page */}
        <Link to="/tools" className="resource-card">
          <div className="card-icon">🛠️</div>
          <h3 className="card-title">Smart Tools</h3>
          <p className="card-description">
            Study planners, calculators, and converters to optimize learning
          </p>
        </Link>
        
        {/* Study Tips Section - Links to Blog Page */}
        <Link to="/blog" className="resource-card">
          <div className="card-icon">💡</div>
          <h3 className="card-title">Study Tips</h3>
          <p className="card-description">
            Expert advice and strategies for effective exam preparation
          </p>
        </Link>
      </div>
    </div>
  )
}

export default Home
