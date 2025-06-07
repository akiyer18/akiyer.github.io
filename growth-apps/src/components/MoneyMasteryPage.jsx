import { useState } from 'react'
import { Link } from 'react-router-dom'

const MoneyMasteryPage = () => {
  const [showInstructions, setShowInstructions] = useState(true)
  const [income, setIncome] = useState('')
  const [expenses, setExpenses] = useState([])
  const [newExpense, setNewExpense] = useState({ category: '', amount: '', description: '' })

  const expenseCategories = [
    'Housing', 'Food', 'Transportation', 'Healthcare', 'Entertainment', 
    'Shopping', 'Utilities', 'Insurance', 'Savings', 'Other'
  ]

  const addExpense = () => {
    if (newExpense.category && newExpense.amount) {
      setExpenses([...expenses, { ...newExpense, id: Date.now(), amount: parseFloat(newExpense.amount) }])
      setNewExpense({ category: '', amount: '', description: '' })
    }
  }

  const removeExpense = (id) => {
    setExpenses(expenses.filter(exp => exp.id !== id))
  }

  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0)
  const remainingIncome = parseFloat(income || 0) - totalExpenses

  const exportToCSV = () => {
    const csvData = [
      ['Type', 'Category', 'Amount', 'Description'],
      ['Income', 'Total Income', income, 'Monthly Income'],
      ...expenses.map(exp => ['Expense', exp.category, exp.amount, exp.description]),
      ['', '', '', ''],
      ['Summary', 'Total Income', income, ''],
      ['Summary', 'Total Expenses', totalExpenses, ''],
      ['Summary', 'Remaining', remainingIncome, '']
    ]
    
    const csv = csvData.map(row => row.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `money_tracker_${new Date().toISOString().split('T')[0]}.csv`
    link.click()
  }

  const clearAllData = () => {
    setIncome('')
    setExpenses([])
    setNewExpense({ category: '', amount: '', description: '' })
  }

  if (showInstructions) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800">
        <div className="max-w-4xl mx-auto p-6">
          {/* Navigation */}
          <div className="mb-8">
            <Link 
              to="/"
              className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors"
            >
              ← Back to Home
            </Link>
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">💸 Money Mastery</h1>
            <p className="text-xl text-white/70">Privacy-First Financial Tracking</p>
          </div>

          {/* Privacy Notice */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 mb-8">
            <div className="text-center mb-6">
              <div className="text-4xl mb-4">🔐</div>
              <h2 className="text-2xl font-bold text-white mb-4">Your Finance, Your Control</h2>
              <p className="text-white/80 text-lg">
                This tool is intentionally built with <strong>zero data storage</strong> – it does not track, save, or transmit your financial data.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-green-500/20 border border-green-500/30 rounded-xl p-6">
                <h3 className="text-green-300 font-semibold text-lg mb-3">✅ What We Do</h3>
                <ul className="text-white/80 space-y-2 text-sm">
                  <li>• Provide calculation tools</li>
                  <li>• Show real-time summaries</li>
                  <li>• Export to CSV/Excel</li>
                  <li>• Run entirely in your browser</li>
                </ul>
              </div>

              <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-6">
                <h3 className="text-red-300 font-semibold text-lg mb-3">❌ What We Don't Do</h3>
                <ul className="text-white/80 space-y-2 text-sm">
                  <li>• Store your data anywhere</li>
                  <li>• Send data to servers</li>
                  <li>• Track your usage</li>
                  <li>• Remember previous sessions</li>
                </ul>
              </div>
            </div>

            <div className="bg-blue-500/20 border border-blue-500/30 rounded-xl p-6 mb-6">
              <h3 className="text-blue-300 font-semibold text-lg mb-3">🧭 How to Use Safely</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <div className="text-white font-medium mb-2">1. Preview Features</div>
                  <p className="text-white/70">Try out income, expenses, and calculations</p>
                </div>
                <div>
                  <div className="text-white font-medium mb-2">2. Export Data</div>
                  <p className="text-white/70">Download CSV for Excel/Sheets</p>
                </div>
                <div>
                  <div className="text-white font-medium mb-2">3. Clone & Customize</div>
                  <p className="text-white/70">Run entirely offline on your device</p>
                </div>
              </div>
            </div>

            <div className="bg-purple-500/20 border border-purple-500/30 rounded-xl p-6">
              <h3 className="text-purple-300 font-semibold text-lg mb-3">📥 Clone for Personal Use</h3>
              <div className="bg-black/30 rounded-lg p-4 font-mono text-sm text-white/90 mb-4">
                <div>git clone https://github.com/akiyer18/akiyer18.github.io</div>
                <div>cd akiyer18.github.io</div>
                <div>open index.html  # Run completely offline</div>
              </div>
              <p className="text-white/70 text-sm">
                📬 Questions? Reach out: <span className="text-blue-300">akshaye.iyer@outlook.com</span>
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setShowInstructions(false)}
              className="bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white px-8 py-3 rounded-xl font-bold text-lg transform hover:scale-105 transition-all duration-300"
            >
              🚀 Try the Tool
            </button>
            
            <a
              href="https://github.com/akiyer18/akiyer18.github.io"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white px-8 py-3 rounded-xl font-bold text-lg transform hover:scale-105 transition-all duration-300 text-center"
            >
              📂 View Repository
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800">
      <div className="max-w-6xl mx-auto p-6">
        {/* Navigation */}
        <div className="mb-8 flex justify-between items-center">
          <Link 
            to="/"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors"
          >
            ← Back to Home
          </Link>
          
          <button
            onClick={() => setShowInstructions(true)}
            className="text-white/70 hover:text-white transition-colors text-sm"
          >
            🔐 Privacy Info
          </button>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">💸 Money Mastery</h1>
          <p className="text-white/70">Track your finances securely - no data stored</p>
          
          {/* Privacy Reminder */}
          <div className="inline-flex items-center gap-2 bg-yellow-500/20 border border-yellow-500/30 rounded-lg px-4 py-2 mt-4">
            <span className="text-yellow-300 text-sm">⚠️ Data is temporary - export to save</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Income Section */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h2 className="text-xl font-bold text-white mb-4">💰 Monthly Income</h2>
            <input
              type="number"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              placeholder="Enter monthly income"
              className="w-full bg-white/20 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="mt-4 text-2xl font-bold text-green-300">
              ${parseFloat(income || 0).toLocaleString()}
            </div>
          </div>

          {/* Expenses Section */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h2 className="text-xl font-bold text-white mb-4">💳 Add Expense</h2>
            
            <div className="space-y-3">
              <select
                value={newExpense.category}
                onChange={(e) => setNewExpense({...newExpense, category: e.target.value})}
                className="w-full bg-white/20 border border-white/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select category</option>
                {expenseCategories.map(cat => (
                  <option key={cat} value={cat} className="bg-slate-800">{cat}</option>
                ))}
              </select>
              
              <input
                type="number"
                value={newExpense.amount}
                onChange={(e) => setNewExpense({...newExpense, amount: e.target.value})}
                placeholder="Amount"
                className="w-full bg-white/20 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              
              <input
                type="text"
                value={newExpense.description}
                onChange={(e) => setNewExpense({...newExpense, description: e.target.value})}
                placeholder="Description (optional)"
                className="w-full bg-white/20 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              
              <button
                onClick={addExpense}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 py-3 rounded-lg font-bold transition-all duration-300"
              >
                Add Expense
              </button>
            </div>
          </div>

          {/* Summary Section */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h2 className="text-xl font-bold text-white mb-4">📊 Summary</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-white/70">Income:</span>
                <span className="text-green-300 font-bold">${parseFloat(income || 0).toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-white/70">Expenses:</span>
                <span className="text-red-300 font-bold">-${totalExpenses.toLocaleString()}</span>
              </div>
              
              <div className="border-t border-white/20 pt-4">
                <div className="flex justify-between">
                  <span className="text-white font-bold">Remaining:</span>
                  <span className={`font-bold text-xl ${remainingIncome >= 0 ? 'text-green-300' : 'text-red-300'}`}>
                    ${remainingIncome.toLocaleString()}
                  </span>
                </div>
              </div>
              
              <div className="mt-6 space-y-3">
                <button
                  onClick={exportToCSV}
                  className="w-full bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white px-4 py-2 rounded-lg font-bold transition-all duration-300"
                >
                  📥 Export to CSV
                </button>
                
                <button
                  onClick={clearAllData}
                  className="w-full bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white px-4 py-2 rounded-lg font-bold transition-all duration-300"
                >
                  🗑️ Clear All Data
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Expenses List */}
        {expenses.length > 0 && (
          <div className="mt-8 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h2 className="text-xl font-bold text-white mb-4">📝 Expense List</h2>
            
            <div className="space-y-3">
              {expenses.map((expense) => (
                <div key={expense.id} className="flex items-center justify-between bg-white/5 rounded-lg p-4">
                  <div>
                    <div className="text-white font-medium">{expense.category}</div>
                    <div className="text-white/70 text-sm">{expense.description}</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-red-300 font-bold">${expense.amount.toLocaleString()}</span>
                    <button
                      onClick={() => removeExpense(expense.id)}
                      className="text-red-400 hover:text-red-300 transition-colors"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default MoneyMasteryPage 