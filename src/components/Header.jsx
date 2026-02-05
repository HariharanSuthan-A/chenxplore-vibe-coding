import { Link, useLocation } from 'react-router-dom'
import { Plus, Grid3X3 } from 'lucide-react'
import Logo from './Logo'

function Header() {
  const location = useLocation()

  return (
    <>
      <header className="header">
        <div className="container header-content">
          <Logo />
          
          <nav className="nav">
            <Link 
              to="/" 
              className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
            >
              <Grid3X3 size={16} />
              Projects
            </Link>
            <Link 
              to="/upload" 
              className={`nav-link ${location.pathname === '/upload' ? 'active' : ''}`}
            >
              <Plus size={16} />
              Add Project
            </Link>
          </nav>

          <Link to="/upload" className="btn btn-primary btn-sm">
            <Plus size={16} />
            Share Project
          </Link>
        </div>
      </header>

      <div className="header-banner">
        <img 
          src="/images/vibe-banner.png" 
          alt="Vibe-Coding Challenge promotional banner"
        />
      </div>
    </>
  )
}

export default Header
