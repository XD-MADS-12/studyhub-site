import React from 'react'
import ResourceCard from '../components/ResourceCard'

const Notes = () => {
  const notesData = [
    {
      id: 1,
      title: 'SSC Physics Notes',
      description: 'Comprehensive physics notes covering all SSC syllabus topics',
      link: 'https://cuty.io/SSCPhysics2024'
    },
    {
      id: 2,
      title: 'HSC Chemistry Guide',
      description: 'Detailed chemistry concepts with practice problems',
      link: 'https://cuty.io/HSCChemistry2024'
    },
    {
      id: 3,
      title: 'Math Formula Sheet',
      description: 'Essential formulas for SSC & HSC mathematics',
      link: 'https://cuty.io/MathFormulas2024'
    },
    {
      id: 4,
      title: 'Biology Quick Reference',
      description: 'Key biology concepts in easy-to-understand format',
      link: 'https://cuty.io/BioQuickRef2024'
    },
    {
      id: 5,
      title: 'English Grammar Guide',
      description: 'Grammar rules and writing tips for board exams',
      link: 'https://cuty.io/EnglishGrammar2024'
    },
    {
      id: 6,
      title: 'History Timeline Charts',
      description: 'Important historical events with visual timelines',
      link: 'https://cuty.io/HistoryTimelines2024'
    }
  ]

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Free Study Notes</h1>
        <p className="page-subtitle">
          Download high-quality PDF notes for SSC and HSC subjects. All resources are 
          created by experienced educators and updated for the current academic year.
        </p>
      </div>
      
      <div className="card-grid">
        {notesData.map((note) => (
          <ResourceCard
            key={note.id}
            title={note.title}
            description={note.description}
            link={note.link}
            type="note"
          />
        ))}
      </div>
    </div>
  )
}

export default Notes
