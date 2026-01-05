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
    <div className="resource-card">
      <div className="card-icon">{getIcon()}</div>
      <h3 className="card-title">{title}</h3>
      <p className="card-description">{description}</p>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="btn"
      >
        {type === 'note' ? 'Download PDF' : 'Access Tool'}
      </a>
    </div>
  )
}

export default ResourceCard
