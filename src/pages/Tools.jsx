import React, { useState } from 'react'

const Tools = () => {
  const [gradeCalculator, setGradeCalculator] = useState({
    assignments: [{ name: '', score: '', total: '' }],
    totalScore: 0,
    totalPossible: 0
  });
  
  const [unitConverter, setUnitConverter] = useState({
    value: '',
    fromUnit: 'celsius',
    toUnit: 'fahrenheit',
    result: ''
  });
  
  const [timer, setTimer] = useState({
    minutes: 25,
    seconds: 0,
    isRunning: false,
    intervalId: null
  });
  
  const [formulaSolver, setFormulaSolver] = useState({
    formula: '',
    result: ''
  });

  // Grade Calculator Functions
  const addAssignment = () => {
    setGradeCalculator(prev => ({
      ...prev,
      assignments: [...prev.assignments, { name: '', score: '', total: '' }]
    }));
  };

  const updateAssignment = (index, field, value) => {
    const newAssignments = [...gradeCalculator.assignments];
    newAssignments[index][field] = value;
    setGradeCalculator(prev => ({
      ...prev,
      assignments: newAssignments
    }));
  };

  const calculateGrade = () => {
    let totalScore = 0;
    let totalPossible = 0;
    
    gradeCalculator.assignments.forEach(assignment => {
      if (assignment.score && assignment.total) {
        totalScore += parseFloat(assignment.score) || 0;
        totalPossible += parseFloat(assignment.total) || 0;
      }
    });
    
    setGradeCalculator(prev => ({
      ...prev,
      totalScore,
      totalPossible
    }));
  };

  // Unit Converter Functions
  const convertUnit = () => {
    const value = parseFloat(unitConverter.value);
    if (isNaN(value)) {
      setUnitConverter(prev => ({ ...prev, result: 'Invalid input' }));
      return;
    }

    let result = 0;
    
    if (unitConverter.fromUnit === 'celsius' && unitConverter.toUnit === 'fahrenheit') {
      result = (value * 9/5) + 32;
    } else if (unitConverter.fromUnit === 'fahrenheit' && unitConverter.toUnit === 'celsius') {
      result = (value - 32) * 5/9;
    } else if (unitConverter.fromUnit === 'km' && unitConverter.toUnit === 'miles') {
      result = value * 0.621371;
    } else if (unitConverter.fromUnit === 'miles' && unitConverter.toUnit === 'km') {
      result = value * 1.60934;
    } else if (unitConverter.fromUnit === 'kg' && unitConverter.toUnit === 'lbs') {
      result = value * 2.20462;
    } else if (unitConverter.fromUnit === 'lbs' && unitConverter.toUnit === 'kg') {
      result = value * 0.453592;
    } else {
      result = value; // Same unit
    }
    
    setUnitConverter(prev => ({ ...prev, result: result.toFixed(2) }));
  };

  // Timer Functions
  const startTimer = () => {
    if (timer.intervalId) return; // Prevent multiple intervals
    
    const intervalId = setInterval(() => {
      setTimer(prev => {
        let newMinutes = prev.minutes;
        let newSeconds = prev.seconds - 1;
        
        if (newSeconds < 0) {
          newSeconds = 59;
          newMinutes -= 1;
        }
        
        if (newMinutes < 0) {
          clearInterval(prev.intervalId);
          return { ...prev, minutes: 0, seconds: 0, isRunning: false, intervalId: null };
        }
        
        return { ...prev, minutes: newMinutes, seconds: newSeconds };
      });
    }, 1000);
    
    setTimer(prev => ({ ...prev, isRunning: true, intervalId }));
  };

  const stopTimer = () => {
    if (timer.intervalId) {
      clearInterval(timer.intervalId);
      setTimer(prev => ({ ...prev, isRunning: false, intervalId: null }));
    }
  };

  const resetTimer = () => {
    stopTimer();
    setTimer(prev => ({ ...prev, minutes: 25, seconds: 0 }));
  };

  // Formula Solver Functions
  const solveFormula = () => {
    try {
      const expression = formulaSolver.formula.replace(/\s/g, '');
      if (!expression) {
        setFormulaSolver(prev => ({ ...prev, result: 'Please enter a formula' }));
        return;
      }
      
      // Basic math evaluation (be careful with eval in production)
      // For production, use a safer expression parser
      const result = Function('"use strict"; return (' + expression + ')')();
      setFormulaSolver(prev => ({ ...prev, result: result.toString() }));
    } catch (error) {
      setFormulaSolver(prev => ({ ...prev, result: 'Error: Invalid formula' }));
    }
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Study Tools</h1>
        <p className="page-subtitle">
          Boost your productivity with our collection of free study tools. 
          From grade calculators to study planners, we've got everything you need to succeed.
        </p>
      </div>
      
      <div className="card-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
        {/* Grade Calculator */}
        <div className="resource-card">
          <div className="card-icon">📊</div>
          <h3 className="card-title">Grade Calculator</h3>
          <p className="card-description">Calculate your overall grade based on assignment scores</p>
          
          <div className="tool-container" style={{ marginTop: '1rem' }}>
            {gradeCalculator.assignments.map((assignment, index) => (
              <div key={index} style={{ marginBottom: '1rem' }}>
                <input
                  type="text"
                  placeholder={`Assignment ${index + 1} Name`}
                  value={assignment.name}
                  onChange={(e) => updateAssignment(index, 'name', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    marginBottom: '0.5rem',
                    backgroundColor: '#374151',
                    color: 'white',
                    border: '1px solid #4b5563',
                    borderRadius: '0.25rem'
                  }}
                />
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <input
                    type="number"
                    placeholder="Score"
                    value={assignment.score}
                    onChange={(e) => updateAssignment(index, 'score', e.target.value)}
                    style={{
                      flex: 1,
                      padding: '0.5rem',
                      backgroundColor: '#374151',
                      color: 'white',
                      border: '1px solid #4b5563',
                      borderRadius: '0.25rem'
                    }}
                  />
                  <input
                    type="number"
                    placeholder="Total"
                    value={assignment.total}
                    onChange={(e) => updateAssignment(index, 'total', e.target.value)}
                    style={{
                      flex: 1,
                      padding: '0.5rem',
                      backgroundColor: '#374151',
                      color: 'white',
                      border: '1px solid #4b5563',
                      borderRadius: '0.25rem'
                    }}
                  />
                </div>
              </div>
            ))}
            <button
              onClick={addAssignment}
              style={{
                backgroundColor: '#3b82f6',
                color: 'white',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '0.25rem',
                cursor: 'pointer',
                marginBottom: '1rem'
              }}
            >
              Add Assignment
            </button>
            <br />
            <button
              onClick={calculateGrade}
              style={{
                backgroundColor: '#10b981',
                color: 'white',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '0.25rem',
                cursor: 'pointer'
              }}
            >
              Calculate Grade
            </button>
            {gradeCalculator.totalPossible > 0 && (
              <div style={{ marginTop: '1rem', fontSize: '1.1rem' }}>
                <p>Total Score: {gradeCalculator.totalScore} / {gradeCalculator.totalPossible}</p>
                <p>Percentage: {((gradeCalculator.totalScore / gradeCalculator.totalPossible) * 100).toFixed(2)}%</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Unit Converter */}
        <div className="resource-card">
          <div className="card-icon">📏</div>
          <h3 className="card-title">Unit Converter</h3>
          <p className="card-description">Convert between different measurement units instantly</p>
          
          <div className="tool-container" style={{ marginTop: '1rem' }}>
            <input
              type="number"
              placeholder="Enter value"
              value={unitConverter.value}
              onChange={(e) => setUnitConverter(prev => ({ ...prev, value: e.target.value, result: '' }))}
              style={{
                width: '100%',
                padding: '0.5rem',
                marginBottom: '1rem',
                backgroundColor: '#374151',
                color: 'white',
                border: '1px solid #4b5563',
                borderRadius: '0.25rem'
              }}
            />
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
              <select
                value={unitConverter.fromUnit}
                onChange={(e) => setUnitConverter(prev => ({ ...prev, fromUnit: e.target.value, result: '' }))}
                style={{
                  flex: 1,
                  padding: '0.5rem',
                  backgroundColor: '#374151',
                  color: 'white',
                  border: '1px solid #4b5563',
                  borderRadius: '0.25rem'
                }}
              >
                <option value="celsius">Celsius</option>
                <option value="fahrenheit">Fahrenheit</option>
                <option value="km">Kilometers</option>
                <option value="miles">Miles</option>
                <option value="kg">Kilograms</option>
                <option value="lbs">Pounds</option>
              </select>
              <span style={{ alignSelf: 'center' }}>→</span>
              <select
                value={unitConverter.toUnit}
                onChange={(e) => setUnitConverter(prev => ({ ...prev, toUnit: e.target.value, result: '' }))}
                style={{
                  flex: 1,
                  padding: '0.5rem',
                  backgroundColor: '#374151',
                  color: 'white',
                  border: '1px solid #4b5563',
                  borderRadius: '0.25rem'
                }}
              >
                <option value="fahrenheit">Fahrenheit</option>
                <option value="celsius">Celsius</option>
                <option value="miles">Miles</option>
                <option value="km">Kilometers</option>
                <option value="lbs">Pounds</option>
                <option value="kg">Kilograms</option>
              </select>
            </div>
            <button
              onClick={convertUnit}
              style={{
                backgroundColor: '#10b981',
                color: 'white',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '0.25rem',
                cursor: 'pointer'
              }}
            >
              Convert
            </button>
            {unitConverter.result && (
              <div style={{ marginTop: '1rem', fontSize: '1.1rem' }}>
                <p>Result: {unitConverter.result}</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Exam Timer */}
        <div className="resource-card">
          <div className="card-icon">⏱️</div>
          <h3 className="card-title">Exam Timer</h3>
          <p className="card-description">Customizable timer for exam practice sessions</p>
          
          <div className="tool-container" style={{ marginTop: '1rem', textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', fontFamily: 'monospace', marginBottom: '1rem' }}>
              {timer.minutes.toString().padStart(2, '0')}:{timer.seconds.toString().padStart(2, '0')}
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginBottom: '1rem' }}>
              <button
                onClick={startTimer}
                disabled={timer.isRunning}
                style={{
                  backgroundColor: '#10b981',
                  color: 'white',
                  border: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: '0.25rem',
                  cursor: 'pointer',
                  opacity: timer.isRunning ? 0.5 : 1
                }}
              >
                Start
              </button>
              <button
                onClick={stopTimer}
                style={{
                  backgroundColor: '#ef4444',
                  color: 'white',
                  border: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: '0.25rem',
                  cursor: 'pointer'
                }}
              >
                Stop
              </button>
              <button
                onClick={resetTimer}
                style={{
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  border: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: '0.25rem',
                  cursor: 'pointer'
                }}
              >
                Reset
              </button>
            </div>
            <div>
              <label>Minutes: </label>
              <input
                type="number"
                value={timer.minutes}
                onChange={(e) => setTimer(prev => ({ ...prev, minutes: parseInt(e.target.value) || 0 }))}
                disabled={timer.isRunning}
                style={{
                  width: '60px',
                  padding: '0.25rem',
                  backgroundColor: '#374151',
                  color: 'white',
                  border: '1px solid #4b5563',
                  borderRadius: '0.25rem'
                }}
              />
            </div>
          </div>
        </div>
        
        {/* Formula Solver */}
        <div className="resource-card">
          <div className="card-icon">🔢</div>
          <h3 className="card-title">Formula Solver</h3>
          <p className="card-description">Solve complex math and science formulas step-by-step</p>
          
          <div className="tool-container" style={{ marginTop: '1rem' }}>
            <input
              type="text"
              placeholder="Enter formula (e.g., 2+3*4)"
              value={formulaSolver.formula}
              onChange={(e) => setFormulaSolver(prev => ({ ...prev, formula: e.target.value, result: '' }))}
              style={{
                width: '100%',
                padding: '0.5rem',
                marginBottom: '1rem',
                backgroundColor: '#374151',
                color: 'white',
                border: '1px solid #4b5563',
                borderRadius: '0.25rem'
              }}
            />
            <button
              onClick={solveFormula}
              style={{
                backgroundColor: '#10b981',
                color: 'white',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '0.25rem',
                cursor: 'pointer'
              }}
            >
              Solve
            </button>
            {formulaSolver.result && (
              <div style={{ marginTop: '1rem', fontSize: '1.1rem' }}>
                <p>Result: {formulaSolver.result}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Tools
