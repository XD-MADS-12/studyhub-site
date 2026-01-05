import React from 'react'
import ResourceCard from '../components/ResourceCard'
import notesData from '../data/notes'

const Notes = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Free Study Notes
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Download high-quality PDF notes for SSC and HSC subjects. All resources are 
          created by experienced educators and updated for the current academic year.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
