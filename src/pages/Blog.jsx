import React from 'react'

const Blog = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Study Resources Blog
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Coming soon! AI-generated study tips, exam strategies, and educational content.
          Bookmark this page for future updates on study techniques and academic success.
        </p>
      </div>
      
      <div className="bg-gray-800 rounded-xl p-12 text-center border border-gray-700">
        <div className="text-5xl mb-6">🤖</div>
        <h2 className="text-2xl font-bold text-white mb-4">AI-Powered Content Coming Soon!</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Our AI will soon generate personalized study guides, exam insights, 
          and learning strategies tailored to your academic needs.
        </p>
      </div>
    </div>
  )
}

export default Blog
