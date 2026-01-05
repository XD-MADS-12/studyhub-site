import React from 'react'

const ResourceCard = ({ title, description, link, type, icon }) => {
  return (
    <div className="resource-card">
      <div className="card-icon">{icon || '📄'}</div>
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
