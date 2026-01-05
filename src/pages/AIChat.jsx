import React, { useState, useRef, useEffect } from 'react'

const AIChat = () => {
  const [messages, setMessages] = useState([
    { id: 1, role: 'assistant', content: 'Hello! I\'m your AI study assistant. How can I help you with your studies today?', timestamp: new Date() }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState('english')
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setLoading(true)

    try {
      const response = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: inputMessage,
          history: messages.slice(-10), // Send last 10 messages as context
          language: selectedLanguage
        })
      })

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to get response')
      }

      const data = await response.json()
      
      const aiMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: data.response,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, aiMessage])
    } catch (error) {
      console.error('Error:', error)
      const errorMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const clearChat = () => {
    setMessages([
      { id: 1, role: 'assistant', content: 'Hello! I\'m your AI study assistant. How can I help you with your studies today?', timestamp: new Date() }
    ])
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
      <div className="page-header">
        <h1 className="page-title">AI Study Assistant</h1>
        <p className="page-subtitle">
          Chat with your AI tutor in English or Bangla. Get help with homework, study tips, and explanations.
        </p>
      </div>

      {/* Language and Controls */}
      <div className="resource-card" style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <select
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
          style={{
            padding: '0.5rem',
            backgroundColor: '#374151',
            color: 'white',
            border: '1px solid #4b5563',
            borderRadius: '0.25rem'
          }}
        >
          <option value="english">English</option>
          <option value="bangla">বাংলা</option>
        </select>
        <button
          onClick={clearChat}
          className="btn"
          style={{ padding: '0.5rem 1rem' }}
        >
          Clear Chat
        </button>
      </div>

      {/* Chat Container */}
      <div style={{
        height: '500px',
        overflowY: 'auto',
        border: '1px solid #374151',
        borderRadius: '0.5rem',
        padding: '1rem',
        marginBottom: '1rem',
        backgroundColor: '#1f2937'
      }}>
        {messages.map((msg) => (
          <div
            key={msg.id}
            style={{
              marginBottom: '1rem',
              display: 'flex',
              justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start'
            }}
          >
            <div
              style={{
                maxWidth: '80%',
                padding: '0.75rem',
                borderRadius: '0.5rem',
                backgroundColor: msg.role === 'user' ? '#3b82f6' : '#374151',
                color: 'white',
                fontFamily: selectedLanguage === 'bangla' ? '"Noto Sans Bengali", sans-serif' : 'inherit'
              }}
            >
              <div style={{ fontSize: '0.8rem', opacity: 0.7, marginBottom: '0.25rem' }}>
                {msg.role === 'user' ? 'You' : 'AI Assistant'}
              </div>
              <div>{msg.content}</div>
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '1rem' }}>
            <div style={{
              padding: '0.75rem',
              borderRadius: '0.5rem',
              backgroundColor: '#374151',
              color: 'white'
            }}>
              <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>AI Assistant</div>
              <div>Thinking...</div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <textarea
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={`Ask your AI tutor... (Try: "Explain quadratic equations" or "বহুপদ সমীকরণ কীভাবে সমাধান করবো?")`}
          rows={3}
          style={{
            flex: 1,
            padding: '0.75rem',
            backgroundColor: '#374151',
            color: 'white',
            border: '1px solid #4b5563',
            borderRadius: '0.25rem',
            resize: 'vertical'
          }}
        />
        <button
          onClick={sendMessage}
          disabled={loading || !inputMessage.trim()}
          className="btn"
          style={{ 
            alignSelf: 'flex-start',
            padding: '0.75rem 1.5rem',
            opacity: loading || !inputMessage.trim() ? 0.5 : 1 
          }}
        >
          Send
        </button>
      </div>

      {/* Quick Suggestions */}
      <div style={{ marginTop: '1rem' }}>
        <h3 style={{ color: 'var(--secondary-text)', marginBottom: '0.5rem' }}>Quick Suggestions:</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {[
            'Explain photosynthesis',
            'How to solve algebra problems?',
            'Tips for chemistry exams',
            'বাংলা সাহিত্যের সারাংশ',
            'Physics formulas',
            'Math shortcuts'
          ].map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => setInputMessage(suggestion)}
              style={{
                backgroundColor: '#374151',
                color: 'white',
                border: '1px solid #4b5563',
                borderRadius: '0.25rem',
                padding: '0.25rem 0.5rem',
                fontSize: '0.8rem',
                cursor: 'pointer'
              }}
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AIChat
