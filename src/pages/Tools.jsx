import React from 'react'
import ResourceCard from '../components/ResourceCard'

const Tools = () => {
  const toolsData = [
    {
      id: 1,
      title: 'Grade Calculator',
      description: 'Calculate your overall grade based on assignment scores',
      link: 'https://cuty.io/GradeCalc2024'
    },
    {
      id: 2,
      title: 'Unit Converter',
      description: 'Convert between different measurement units instantly',
      link: 'https://cuty.io/UnitConverter2024'
    },
    {
      id: 3,
      title: 'Exam Timer',
      description: 'Customizable timer for exam practice sessions',
      link: 'https://cuty.io/ExamTimer2024'
    },
    {
      id: 4,
      title: 'Formula Solver',
      description: 'Solve complex math and science formulas step-by-step',
      link: 'https://cuty.io/FormulaSolver2024'
    },
    {
      id: 5,
      title: 'Study Planner',
      description: 'Create personalized study schedules for your exams',
      link: 'https://cuty.io/StudyPlanner2024'
    },
    {
      id: 6,
      title: 'Flashcard Generator',
      description: 'Create digital flashcards from your notes',
      link: 'https://cuty.io/FlashcardGen2024'
    }
  ]

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Study Tools</h1>
        <p className="page-subtitle">
          Boost your productivity with our collection of free study tools. 
          From grade calculators to study planners, we've got everything you need to succeed.
        </p>
      </div>
      
      <div className="card-grid">
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
