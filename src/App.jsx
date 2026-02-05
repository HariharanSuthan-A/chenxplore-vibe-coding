import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import ProjectGallery from './components/ProjectGallery'
import UploadForm from './components/UploadForm'
import './styles/theme.css'
import './styles/theme-competition.css'

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main style={{ minHeight: 'calc(100vh - 4rem - 80px)' }}>
          <Routes>
            <Route path="/" element={<ProjectGallery />} />
            <Route path="/upload" element={<UploadForm />} />
          </Routes>
        </main>
        <footer className="footer">
          <div className="container footer-content">
            <p className="footer-text">
              © {new Date().getFullYear()} Chexplore. Share your creations with the world.
            </p>
            <p className="footer-text">
              Made with 💚 for developers
            </p>
          </div>
        </footer>
      </div>
    </Router>
  )
}

export default App
