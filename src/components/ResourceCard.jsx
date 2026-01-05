import React from 'react'

const ResourceCard = ({ title, description, link, type }) => {
  const getIcon = () => {
    switch (type) {
      case 'note':
        return '📚'
      case 'tool':
        return '🛠️'
      case 'blog':
        return '📝'
      default:
        return '📄'
    }
  }

  return (
    <div className="bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-700">
      <div className="text-3xl mb-4">{getIcon()}</div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-400 mb-4">{description}</p>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300"
      >
        {type === 'note' ? 'Download PDF' : 'Access Tool'}
      </a>
    </div>
  )
}

export default ResourceCard
