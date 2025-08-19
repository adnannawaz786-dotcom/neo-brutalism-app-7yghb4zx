import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import { SITE_TITLE } from './lib/constants.jsx'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-yellow-300">
        <header className="bg-black border-8 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <div className="max-w-6xl mx-auto px-6 py-6">
            <h1 className="text-4xl font-black text-yellow-300 uppercase tracking-wider transform -skew-x-12">
              {SITE_TITLE}
            </h1>
          </div>
        </header>
        
        <main className="max-w-6xl mx-auto px-6 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </main>
        
        <footer className="bg-black border-t-8 border-black mt-16">
          <div className="max-w-6xl mx-auto px-6 py-8">
            <div className="bg-red-500 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-4 transform rotate-1">
              <p className="text-black font-black text-lg uppercase tracking-wide text-center">
                BRUTALLY SIMPLE. BRUTALLY EFFECTIVE.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  )
}

export default App