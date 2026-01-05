import React from 'react'
import ResourceCard from '../components/ResourceCard'
import toolsData from '../data/tools'

const Tools = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Study Tools
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Boost your productivity with our collection of free study tools. 
          From grade calculators to study planners, we've got everything you need to succeed.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {toolsData.map((tool) => (
          <ResourceCard
            key={tool.id}
            title={tool.title}
            description={tool.description}
            link={tool.link}
            type="tool"
          />
        ))}
      </div>
    </div>
  )
}

export default Tools
