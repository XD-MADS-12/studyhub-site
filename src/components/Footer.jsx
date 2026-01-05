import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-800 border-t border-gray-700 py-6 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto text-center text-gray-400">
        <p>© {new Date().getFullYear()} StudyHub. All rights reserved.</p>
        <p className="mt-2 text-sm">Free educational resources for SSC & HSC students</p>
      </div>
    </footer>
  )
}

export default Footer
