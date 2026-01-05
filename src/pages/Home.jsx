import React from 'react'

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
        <div className="resource-card">
          <div className="card-icon">📚</div>
          <h3 className="card-title">Quality Notes</h3>
          <p className="card-description">
            Curated notes by subject experts covering entire syllabus
          </p>
        </div>
        
        <div className="resource-card">
          <div className="card-icon">🛠️</div>
          <h3 className="card-title">Smart Tools</h3>
          <p className="card-description">
            Study planners, calculators, and converters to optimize learning
          </p>
        </div>
        
        <div className="resource-card">
          <div className="card-icon">💡</div>
          <h3 className="card-title">Study Tips</h3>
          <p className="card-description">
            Expert advice and strategies for effective exam preparation
          </p>
        </div>
      </div>
    </div>
  )
}

export default Home
