import React from 'react'

const Home = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Your Ultimate Study Companion
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10">
          Free SSC & HSC notes, study tools, and resources to help you excel in your exams. 
          Download PDFs, use our tools, and boost your academic performance!
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <div className="text-4xl mb-4">📚</div>
            <h3 className="text-xl font-bold text-white mb-2">Quality Notes</h3>
            <p className="text-gray-400">
              Curated notes by subject experts covering entire syllabus
            </p>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <div className="text-4xl mb-4">🛠️</div>
            <h3 className="text-xl font-bold text-white mb-2">Smart Tools</h3>
            <p className="text-gray-400">
              Study planners, calculators, and converters to optimize learning
            </p>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <div className="text-4xl mb-4">💡</div>
            <h3 className="text-xl font-bold text-white mb-2">Study Tips</h3>
            <p className="text-gray-400">
              Expert advice and strategies for effective exam preparation
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
