import { useState, useEffect } from 'react'
import { Github, Globe, Image as ImageIcon, FolderOpen, Zap, Calendar, Trophy, Users, ArrowRight, Code2, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'

function ProjectGallery() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedScreenshots, setSelectedScreenshots] = useState(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        throw error
      }

      setProjects(data || [])
    } catch (err) {
      console.error('Error fetching projects:', err)
      setError('Failed to load projects. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="container">
        <div className="loading">
          <div className="spinner"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container">
        <div className="alert alert-error">
          <span>{error}</span>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Hero Section - Competition Landing */}
      <section className="competition-hero">
        <div className="container">
          <div className="hero-badge">
            <Zap size={16} />
            <span>March 2026</span>
          </div>
          
          <h1 className="competition-title">
            Vibe-Coding
            <br />
            <span className="gradient-text">Challenge</span>
          </h1>
          
          <p className="competition-tagline">
            Solve the real problem in blazing fast.
          </p>
          
          <p className="competition-description">
            Share your projects, get feedback, and compete for amazing prizes.
          </p>

          <div className="hero-cta">
            <Link to="/upload" className="btn btn-primary btn-lg">
              <Code2 size={20} />
              Submit Your Project
              <ArrowRight size={18} />
            </Link>
            <a href="#projects" className="btn btn-secondary btn-lg">
              View Submissions
            </a>
          </div>

          <div className="competition-stats">
            <div className="stat-item">
              <Users size={24} />
              <div>
                <span className="stat-value">{projects.length}</span>
                <span className="stat-label">Submissions</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Competition Info Section */}
      <section className="competition-info">
        <div className="container">
          <div className="info-grid">
            <div className="info-card">
              <div className="info-icon">
                <Zap size={28} />
              </div>
              <h3>Blazing Fast</h3>
              <p>Build and ship your project in record time. Speed matters, but quality wins.</p>
            </div>
            <div className="info-card">
              <div className="info-icon">
                <Code2 size={28} />
              </div>
              <h3>Real Problems</h3>
              <p>Solve genuine challenges that people face. Impactful solutions rise to the top.</p>
            </div>
            <div className="info-card">
              <div className="info-icon">
                <Trophy size={28} />
              </div>
              <h3>Win Big</h3>
              <p>Compete for cash prizes and certificates.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Competition Submissions</h2>
            <p className="section-description">
              Check out what developers are building for the Vibe-Coding Challenge
            </p>
          </div>

          {loading ? (
            <div className="loading">
              <div className="spinner"></div>
            </div>
          ) : error ? (
            <div className="alert alert-error">
              <span>{error}</span>
            </div>
          ) : projects.length === 0 ? (
            <div className="empty-state">
              <FolderOpen className="empty-state-icon" />
              <h3 className="empty-state-title">No submissions yet</h3>
              <p className="empty-state-description">
                Be the first to submit your project for the Vibe-Coding Challenge!
              </p>
              <Link to="/upload" className="btn btn-primary">
                Submit Your Project
              </Link>
            </div>
          ) : (
            <>
              <div className="submission-count">
                <span>{projects.length} project{projects.length !== 1 ? 's' : ''} submitted</span>
              </div>
              
              <div className="project-grid">
                {projects.map((project) => (
                  <article key={project.id} className="project-card">
                    {/* Project Image */}
                    <div className="project-image">
                      {project.screenshots && project.screenshots.length > 0 ? (
                        <img 
                          src={project.screenshots[0]} 
                          alt={project.title}
                          onError={(e) => {
                            e.target.style.display = 'none'
                            e.target.nextSibling.style.display = 'flex'
                          }}
                        />
                      ) : (
                        <div className="project-image-placeholder">
                          <ImageIcon size={48} />
                        </div>
                      )}
                    </div>

                    {/* Project Content */}
                    <div className="project-content">
                      <h3 className="project-title">{project.title}</h3>
                      <p className="project-description">
                        {project.description || 'No description provided'}
                      </p>

                      {/* Links */}
                      <div className="project-links">
                        {project.github_url && (
                          <a 
                            href={project.github_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="project-link"
                          >
                            <Github size={14} />
                            GitHub
                          </a>
                        )}
                        
                        {project.hosted_url && (
                          <a 
                            href={project.hosted_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="project-link"
                          >
                            <Globe size={14} />
                            Live Demo
                          </a>
                        )}

                        {project.screenshots && project.screenshots.length > 1 && (
                          <button 
                            onClick={() => {
                              setSelectedScreenshots(project.screenshots)
                              setCurrentImageIndex(0)
                            }}
                            className="project-link"
                          >
                            <ImageIcon size={14} />
                            {project.screenshots.length} Screenshots
                          </button>
                        )}
                      </div>

                      {/* Author Info */}
                      {project.author_name && (
                        <p className="project-author">
                          By {project.author_name}
                        </p>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Join the Challenge?</h2>
            <p>Submit your projects to us.</p>
            <Link to="/upload" className="btn btn-primary btn-lg">
              <Zap size={20} />
              Submit Your Project Now
            </Link>
          </div>
        </div>
      </section>
      {/* Screenshot Modal */}
      {selectedScreenshots && (
        <div className="screenshot-modal" onClick={() => setSelectedScreenshots(null)}>
          <div className="screenshot-modal-content" onClick={(e) => e.stopPropagation()}>
            <button 
              className="screenshot-modal-close"
              onClick={() => setSelectedScreenshots(null)}
            >
              <X size={24} />
            </button>
            
            <div className="screenshot-modal-image">
              <img 
                src={selectedScreenshots[currentImageIndex]} 
                alt={`Screenshot ${currentImageIndex + 1} of ${selectedScreenshots.length}`}
              />
            </div>
            
            {selectedScreenshots.length > 1 && (
              <div className="screenshot-modal-nav">
                <button 
                  onClick={() => setCurrentImageIndex(prev => prev > 0 ? prev - 1 : selectedScreenshots.length - 1)}
                  className="screenshot-modal-btn"
                >
                  Previous
                </button>
                <span className="screenshot-modal-counter">
                  {currentImageIndex + 1} / {selectedScreenshots.length}
                </span>
                <button 
                  onClick={() => setCurrentImageIndex(prev => prev < selectedScreenshots.length - 1 ? prev + 1 : 0)}
                  className="screenshot-modal-btn"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default ProjectGallery
