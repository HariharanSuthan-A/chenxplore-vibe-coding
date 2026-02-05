import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Upload, X, Github, Globe, Image as ImageIcon, CheckCircle, AlertCircle } from 'lucide-react'
import { supabase } from '../lib/supabase'

const MAX_SCREENSHOTS = 5

function UploadForm() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    githubUrl: '',
    hostedUrl: '',
    authorName: '',
    authorEmail: ''
  })
  const [screenshots, setScreenshots] = useState([])
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState(null)
  const [errors, setErrors] = useState({})

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }))
    }
  }

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files)
    
    if (screenshots.length + files.length > MAX_SCREENSHOTS) {
      setErrors(prev => ({ 
        ...prev, 
        screenshots: `Maximum ${MAX_SCREENSHOTS} screenshots allowed` 
      }))
      return
    }

    const newScreenshots = files.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }))

    setScreenshots(prev => [...prev, ...newScreenshots])
    setErrors(prev => ({ ...prev, screenshots: null }))
  }

  const removeScreenshot = (index) => {
    setScreenshots(prev => {
      const newScreenshots = [...prev]
      URL.revokeObjectURL(newScreenshots[index].preview)
      newScreenshots.splice(index, 1)
      return newScreenshots
    })
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.title.trim()) {
      newErrors.title = 'Project title is required'
    }

    // Check if at least one link is provided
    if (!formData.githubUrl.trim() && !formData.hostedUrl.trim() && screenshots.length === 0) {
      newErrors.links = 'At least one of GitHub link, hosted link, or screenshots is required'
    }

    if (formData.githubUrl && !isValidUrl(formData.githubUrl)) {
      newErrors.githubUrl = 'Please enter a valid URL'
    }

    if (formData.hostedUrl && !isValidUrl(formData.hostedUrl)) {
      newErrors.hostedUrl = 'Please enter a valid URL'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const isValidUrl = (string) => {
    try {
      new URL(string)
      return true
    } catch (_) {
      return false
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setUploading(true)
    setMessage(null)

    try {
      // Upload screenshots to Supabase Storage
      const screenshotUrls = []
      
      for (const screenshot of screenshots) {
        const fileExt = screenshot.file.name.split('.').pop()
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
        const filePath = `screenshots/${fileName}`

        const { error: uploadError } = await supabase.storage
          .from('projects')
          .upload(filePath, screenshot.file)

        if (uploadError) {
          console.error('Upload error:', uploadError)
          continue
        }

        const { data: { publicUrl } } = supabase.storage
          .from('projects')
          .getPublicUrl(filePath)

        screenshotUrls.push(publicUrl)
      }

      // Insert project data
      const { error: insertError } = await supabase
        .from('projects')
        .insert([
          {
            title: formData.title,
            description: formData.description,
            github_url: formData.githubUrl || null,
            hosted_url: formData.hostedUrl || null,
            screenshots: screenshotUrls,
            author_name: formData.authorName || null,
            author_email: formData.authorEmail || null
          }
        ])

      if (insertError) {
        throw insertError
      }

      setMessage({
        type: 'success',
        text: 'Project shared successfully! Redirecting...'
      })

      // Clean up preview URLs
      screenshots.forEach(s => URL.revokeObjectURL(s.preview))

      // Redirect after a short delay
      setTimeout(() => {
        navigate('/')
      }, 2000)

    } catch (error) {
      console.error('Error submitting project:', error)
      setMessage({
        type: 'error',
        text: 'Failed to share project. Please try again.'
      })
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="container">
      <div className="page-header">
        <h1 className="page-title">Share Your Project</h1>
        <p className="page-description">
          Showcase your work with the community. At least one of GitHub link, hosted link, or screenshots is required.
        </p>
      </div>

      {message && (
        <div className={`alert alert-${message.type}`}>
          {message.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
          <span>{message.text}</span>
        </div>
      )}

      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="card-body">
            {/* Project Title */}
            <div className="form-group">
              <label htmlFor="title" className="form-label form-label-required">
                Project Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                className="form-input"
                placeholder="Enter your project name"
                value={formData.title}
                onChange={handleInputChange}
              />
              {errors.title && <p className="form-error">{errors.title}</p>}
            </div>

            {/* Project Description */}
            <div className="form-group">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                className="form-textarea"
                placeholder="Describe your project, technologies used, features, etc."
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
              />
            </div>

            {/* Links Section */}
            <div className="form-group">
              <label className="form-label">
                Project Links <span className="form-hint">(at least one required)</span>
              </label>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {/* GitHub URL */}
                <div>
                  <div style={{ position: 'relative' }}>
                    <Github 
                      size={18} 
                      style={{ 
                        position: 'absolute', 
                        left: '1rem', 
                        top: '50%', 
                        transform: 'translateY(-50%)',
                        color: 'var(--text-muted)'
                      }} 
                    />
                    <input
                      type="url"
                      name="githubUrl"
                      className="form-input"
                      placeholder="https://github.com/username/project"
                      value={formData.githubUrl}
                      onChange={handleInputChange}
                      style={{ paddingLeft: '2.75rem' }}
                    />
                  </div>
                  {errors.githubUrl && <p className="form-error">{errors.githubUrl}</p>}
                </div>

                {/* Hosted URL */}
                <div>
                  <div style={{ position: 'relative' }}>
                    <Globe 
                      size={18} 
                      style={{ 
                        position: 'absolute', 
                        left: '1rem', 
                        top: '50%', 
                        transform: 'translateY(-50%)',
                        color: 'var(--text-muted)'
                      }} 
                    />
                    <input
                      type="url"
                      name="hostedUrl"
                      className="form-input"
                      placeholder="https://your-project.vercel.app"
                      value={formData.hostedUrl}
                      onChange={handleInputChange}
                      style={{ paddingLeft: '2.75rem' }}
                    />
                  </div>
                  {errors.hostedUrl && <p className="form-error">{errors.hostedUrl}</p>}
                </div>
              </div>
              
              {errors.links && <p className="form-error" style={{ marginTop: '0.5rem' }}>{errors.links}</p>}
            </div>

            {/* Screenshots */}
            <div className="form-group">
              <label className="form-label">
                Screenshots <span className="form-hint">(max {MAX_SCREENSHOTS})</span>
              </label>
              
              <div 
                className="file-upload"
                onClick={() => document.getElementById('screenshots').click()}
              >
                <ImageIcon className="file-upload-icon" />
                <p className="file-upload-text">
                  Click to upload screenshots or drag and drop
                </p>
                <p className="file-upload-hint">
                  PNG, JPG, GIF up to 5MB each
                </p>
                <input
                  type="file"
                  id="screenshots"
                  accept="image/*"
                  multiple
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                />
              </div>

              {errors.screenshots && (
                <p className="form-error">{errors.screenshots}</p>
              )}

              {screenshots.length > 0 && (
                <div className="image-preview-grid">
                  {screenshots.map((screenshot, index) => (
                    <div key={index} className="image-preview">
                      <img src={screenshot.preview} alt={`Screenshot ${index + 1}`} />
                      <button
                        type="button"
                        className="image-preview-remove"
                        onClick={() => removeScreenshot(index)}
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Author Info */}
            <div className="form-group">
              <label className="form-label">Author Information (Optional)</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <input
                  type="text"
                  name="authorName"
                  className="form-input"
                  placeholder="Your name"
                  value={formData.authorName}
                  onChange={handleInputChange}
                />
                <input
                  type="email"
                  name="authorEmail"
                  className="form-input"
                  placeholder="your@email.com"
                  value={formData.authorEmail}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          <div className="card-footer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="form-hint">
              {screenshots.length > 0 || formData.githubUrl || formData.hostedUrl 
                ? '✓ Required fields filled' 
                : '⚠ At least one link or screenshot required'}
            </span>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate('/')}
                disabled={uploading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={uploading}
              >
                {uploading ? (
                  <>
                    <div className="spinner" style={{ width: '1rem', height: '1rem', borderWidth: '2px' }} />
                    Sharing...
                  </>
                ) : (
                  <>
                    <Upload size={18} />
                    Share Project
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UploadForm
