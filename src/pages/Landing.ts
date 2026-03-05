import { Navbar, initNavbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { supabase } from '../supabase';

export function LandingPage(): string {
  return `
    ${Navbar()}
    <main class="landing-page">

      <!-- Banner Image -->
      <section class="banner-section" id="banner">
        <img src="/images/banner.jpg" alt="Chenxplore-2k26 Vibe Coding Competition" class="banner-image" />
      </section>

      <!-- Hero Section -->
      <section class="hero" id="hero">
        <div class="container">
          <div class="hero-content">
            <div class="hero-badge">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="3" fill="#10b981"/></svg>
              <span>Chen-Vibe</span>
            </div>
            <h1 class="hero-title">Chen Explore<span class="hero-year">-2k26</span></h1>
            <p class="hero-tagline">College Symposium Project Competition</p>
            <p class="hero-description">Showcase your technical skills in a fast-paced, on-spot project building competition. 45 minutes, any tools, one challenge.</p>
            <div class="hero-actions">
              <a href="/submit" data-link class="btn btn-primary btn-lg" id="hero-submit-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14"/></svg>
                Submit Your Project
              </a>
              <a href="#event-details" class="btn btn-outline btn-lg" id="hero-learn-btn">
                Learn More
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>
              </a>
            </div>
            <div class="hero-stats">
              <div class="stat-item">
                <span class="stat-value">45</span>
                <span class="stat-label">Minutes</span>
              </div>
              <div class="stat-divider"></div>
              <div class="stat-item">
                <span class="stat-value">Any</span>
                <span class="stat-label">Tools Allowed</span>
              </div>
              <div class="stat-divider"></div>
              <div class="stat-item">
                <span class="stat-value">On-Spot</span>
                <span class="stat-label">Topic Format</span>
              </div>
            </div>
          </div>
        </div>
        <div class="hero-bg-pattern"></div>
      </section>

      <!-- Topics Section -->
      <section class="section" id="topics">
        <div class="container">
          <div class="section-header">
            <span class="section-badge">Challenges</span>
            <h2 class="section-title">Competition Topics</h2>
            <p class="section-subtitle">Choose one of the following problem statements for your project.</p>
          </div>
          <div class="topics-grid">
            <!-- Topic 1: Kumaran Home Appliances -->
            <div class="topic-card" id="topic-kumaran">
              <div class="topic-header">
                <span class="topic-number">01</span>
                <h3 class="topic-title">Kumaran Home Appliances</h3>
              </div>
              <div class="topic-body">
                <p class="topic-description">Kumaran Home Appliances is a local retail store supplying affordable plastic household items and essential home appliances. The business needs a simple, product-focused website that clearly displays categories, pricing visibility, and easy inquiry options to compete with larger retail chains and improve customer reach.</p>
                
                <div class="topic-details">
                  <div class="topic-subgroup">
                    <h4>Primary Objective</h4>
                    <p>Structured product presentation and local market visibility.</p>
                  </div>
                  
                  <div class="topic-subgroup">
                    <h4>Key Requirements</h4>
                    <ul class="topic-list">
                      <li>Clean product catalog layout with category filters</li>
                      <li>Attractive UI</li>
                      <li>Offer highlights section and products</li>
                      <li>Mobile-friendly responsive design</li>
                    </ul>
                  </div>

                  <div class="topic-subgroup">
                    <h4>Sample Products</h4>
                    <div class="topic-tags">
                      <span>Storage Containers</span><span>Water Bottles</span><span>Buckets</span><span>Laundry Baskets</span>
                      <span>Plastic Chairs</span><span>Dish Racks</span><span>Mixer Grinder</span><span>Induction Stove</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Topic 2: Murugan Restaurant -->
            <div class="topic-card" id="topic-murugan">
              <div class="topic-header">
                <span class="topic-number">02</span>
                <h3 class="topic-title">Murugan Restaurant</h3>
              </div>
              <div class="topic-body">
                <p class="topic-description">Murugan Restaurant is a traditional Tamil Nadu food restaurant serving breakfast, lunch, and dinner with authentic flavors. The restaurant requires a visually appealing website that highlights its full-day menu, attracts local diners, and enables table reservations or takeaway inquiries.</p>
                
                <div class="topic-details">
                  <div class="topic-subgroup">
                    <h4>Primary Objective</h4>
                    <p>Establish strong digital presence while showcasing authentic regional cuisine.</p>
                  </div>
                  
                  <div class="topic-subgroup">
                    <h4>Key Requirements</h4>
                    <ul class="topic-list">
                      <li>Traditional themed design with categorized menu</li>
                      <li>Food gallery, morning - afternoon - night</li>
                      <li>Contact details and location</li>
                      <li>Mobile optimization</li>
                    </ul>
                  </div>

                  <div class="topic-subgroup">
                    <h4>Sample Foods</h4>
                    <div class="topic-tags">
                      <span>Idli</span><span>Dosa</span><span>South Indian Meals</span><span>Veg Biryani</span>
                      <span>Chicken Biryani</span><span>Parotta</span><span>Filter Coffee</span><span>Payasam</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Event Details Section -->
      <section class="section section-alt" id="event-details">
        <div class="container">
          <div class="section-header">
            <span class="section-badge">Event Information</span>
            <h2 class="section-title">Competition Details</h2>
            <p class="section-subtitle">Everything you need to know about the event.</p>
          </div>
          <div class="details-grid">
            <div class="detail-card" id="detail-date">
              <div class="detail-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
              </div>
              <h3 class="detail-title">Date</h3>
              <p class="detail-value">6th march 2026</p>
              <p class="detail-note">Competition Month: March</p>
            </div>
            <div class="detail-card" id="detail-format">
              <div class="detail-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
                </svg>
              </div>
              <h3 class="detail-title">Format</h3>
              <p class="detail-value">On-Spot Topic</p>
              <p class="detail-note">Topic revealed at the event</p>
            </div>
            <div class="detail-card" id="detail-time">
              <div class="detail-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                </svg>
              </div>
              <h3 class="detail-title">Time Limit</h3>
              <p class="detail-value">45 Minutes</p>
              <p class="detail-note">To build a complete project</p>
            </div>
            <div class="detail-card" id="detail-tools">
              <div class="detail-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
                </svg>
              </div>
              <h3 class="detail-title">Tools</h3>
              <p class="detail-value">Any Tools Allowed</p>
              <p class="detail-note">Use your preferred stack</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Rules Section -->
      <section class="section" id="rules">
        <div class="container">
          <div class="section-header">
            <span class="section-badge">Guidelines</span>
            <h2 class="section-title">Competition Rules</h2>
            <p class="section-subtitle">Please read all rules carefully before participating.</p>
          </div>
          <div class="rules-container">
            <div class="rule-card" id="rule-1">
              <div class="rule-number">01</div>
              <div class="rule-content">
                <h3>On-Spot Topic</h3>
                <p>The project topic will be provided on the spot during the event. Participants will not know the topic in advance.</p>
              </div>
            </div>
            <div class="rule-card" id="rule-2">
              <div class="rule-number">02</div>
              <div class="rule-content">
                <h3>Time Constraint</h3>
                <p>Participants have exactly 45 minutes to complete their project from the moment the topic is announced.</p>
              </div>
            </div>
            <div class="rule-card" id="rule-3">
              <div class="rule-number">03</div>
              <div class="rule-content">
                <h3>Tool Freedom</h3>
                <p>Any development tools, frameworks, libraries, or programming languages are allowed. Use whatever you're most comfortable with.</p>
              </div>
            </div>
            <div class="rule-card" id="rule-4">
              <div class="rule-number">04</div>
              <div class="rule-content">
                <h3>Judging Criteria</h3>
                <p>Judging criteria will be updated soon. Stay tuned for detailed evaluation parameters and scoring methodology.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Submitted Projects Section -->
      <section class="section" id="projects-section">
        <div class="container">
          <div class="section-header">
            <span class="section-badge">Showcase</span>
            <h2 class="section-title">Submitted Projects</h2>
            <p class="section-subtitle">Check out what teams have built during the competition.</p>
          </div>
          <div class="projects-grid" id="projects-grid">
            <div class="loading-state">
              <div class="spinner"></div>
              <p>Loading projects...</p>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="section cta-section" id="cta">
        <div class="container">
          <div class="cta-card">
            <h2 class="cta-title">Ready to Compete?</h2>
            <p class="cta-description">Register your team and submit your project after the competition. Show the world what you can build in 45 minutes.</p>
            <a href="/submit" data-link class="btn btn-primary btn-lg" id="cta-submit-btn">Submit Your Project</a>
          </div>
        </div>
      </section>

      <!-- Lightbox Modal -->
      <div id="lightbox" class="lightbox">
        <button class="lightbox-close" id="lightbox-close" aria-label="Close lightbox">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
        <div class="lightbox-content">
          <img id="lightbox-img" src="" alt="Project Screenshot" />
        </div>
        <div class="lightbox-info">
          <h4 id="lightbox-title"></h4>
          <p id="lightbox-team"></p>
        </div>
      </div>

    </main>
    ${Footer()}
  `;
}

async function fetchAndRenderProjects() {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;

  try {
    const { data: projects, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    if (!projects || projects.length === 0) {
      grid.innerHTML = `
        <div class="empty-state">
          <p>No projects submitted yet. Be the first to share your work!</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = projects.map(project => {
      const screenshots = project.screenshots || [];
      const hasScreenshots = screenshots.length > 0;

      return `
      <div class="project-card">
        <div class="project-image-gallery" data-project-id="${project.id}">
          ${hasScreenshots
          ? `
            <div class="main-screenshot-container">
              <img src="${screenshots[0]}" alt="${project.project_name}" class="main-screenshot" data-index="0" />
              ${screenshots.length > 1 ? `<div class="thumbnail-count">${screenshots.length} Screens</div>` : ''}
            </div>
            ${screenshots.length > 1
            ? `
                <div class="screenshot-thumbnails">
                  ${screenshots.map((url: string, idx: number) => `
                    <div class="thumb-item ${idx === 0 ? 'active' : ''}" data-index="${idx}">
                      <img src="${url}" alt="Thumbnail ${idx + 1}" />
                    </div>
                  `).join('')}
                </div>
              `
            : ''
          }
            `
          : `<div class="no-image-placeholder">No screenshots provided</div>`
        }
        </div>
        <div class="project-card-content">
          <h3 class="project-card-title">${project.project_name}</h3>
          <p class="project-card-team">By ${project.team_name}</p>
          <p class="project-card-desc">${project.description.length > 120 ? project.description.substring(0, 120) + '...' : project.description}</p>
          <div class="project-card-footer">
            ${project.project_url
          ? `<a href="${project.project_url}" target="_blank" class="project-card-link">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
                  Project Link
                </a>`
          : '<span></span>'
        }
          </div>
        </div>
      </div>
    `}).join('');

    // Attach interaction handlers for the galleries
    attachGalleryHandlers(projects);

  } catch (error) {
    console.error('Error fetching projects:', error);
    grid.innerHTML = '<p class="error-text">Failed to load projects. Please refresh the page.</p>';
  }
}

function attachGalleryHandlers(projects: any[]) {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img') as HTMLImageElement;
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxTeam = document.getElementById('lightbox-team');
  const lightboxClose = document.getElementById('lightbox-close');

  document.querySelectorAll('.project-image-gallery').forEach(gallery => {
    const projectId = gallery.getAttribute('data-project-id');
    const project = projects.find(p => p.id === projectId);
    if (!project || !project.screenshots) return;

    const mainImg = gallery.querySelector('.main-screenshot') as HTMLImageElement;
    const thumbs = gallery.querySelectorAll('.thumb-item');

    // Thumbnail click -> switch main image
    thumbs.forEach(thumb => {
      thumb.addEventListener('click', (e) => {
        const idx = parseInt((e.currentTarget as HTMLElement).getAttribute('data-index') || '0');
        mainImg.src = project.screenshots[idx];
        mainImg.setAttribute('data-index', idx.toString());

        // Update active state
        thumbs.forEach(t => t.classList.remove('active'));
        (e.currentTarget as HTMLElement).classList.add('active');
      });
    });

    // Main image click -> open lightbox
    mainImg?.addEventListener('click', () => {
      const currentIdx = parseInt(mainImg.getAttribute('data-index') || '0');
      if (lightbox && lightboxImg) {
        lightboxImg.src = project.screenshots[currentIdx];
        if (lightboxTitle) lightboxTitle.textContent = project.project_name;
        if (lightboxTeam) lightboxTeam.textContent = `By ${project.team_name}`;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
      }
    });
  });

  // Close lightbox
  lightboxClose?.addEventListener('click', () => {
    lightbox?.classList.remove('active');
    document.body.style.overflow = '';
  });

  lightbox?.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      lightbox?.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}

export function initLandingPage() {
  initNavbar();
  fetchAndRenderProjects();

  // Smooth scroll for anchor links
  const learnBtn = document.getElementById('hero-learn-btn');
  if (learnBtn) {
    learnBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.getElementById('event-details');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  // Intersection Observer for scroll animations
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.detail-card, .rule-card, .cta-card, .topic-card').forEach((el) => {
    observer.observe(el);
  });
}
