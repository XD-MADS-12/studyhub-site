import React from 'react'

const Blog = () => {
  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Study Resources Blog</h1>
        <p className="page-subtitle">
          Coming soon! AI-generated study tips, exam strategies, and educational content.
          Bookmark this page for future updates on study techniques and academic success.
        </p>
      </div>
      
      <div className="resource-card" style={{ textAlign: 'center', padding: '3rem' }}>
        <div className="card-icon" style={{ fontSize: '4rem', marginBottom: '1rem' }}>🤖</div>
        <h2 className="card-title" style={{ fontSize: '2rem', marginBottom: '1rem' }}>AI-Powered Content Coming Soon!</h2>
        <p className="card-description" style={{ maxWidth: '600px', margin: '0 auto' }}>
          Our AI will soon generate personalized study guides, exam insights, 
          and learning strategies tailored to your academic needs.
        </p>
      </div>
    </div>
  )
}

export default Blog
