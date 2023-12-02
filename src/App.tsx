import { Routes, Route, BrowserRouter } from 'react-router-dom'
import GuessCountryPage from './pages/guessCountryPage'

function App() {
  return (
    <>
      <h1 className="font-extrabold text-2xl text-center m-3">GeoGeeks</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<GuessCountryPage />} />
          <Route path="*" element={<p>There is nothing here: 404!</p>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App