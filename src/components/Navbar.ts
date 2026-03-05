export function Navbar(): string {
  const currentPath = window.location.pathname;

  return `
    <nav class="navbar" id="navbar">
      <div class="navbar-inner">
        <a href="/" data-link class="navbar-brand">
          <div class="navbar-logo">
            <img src="/images/logo.jpeg" alt="Chen Explore Logo" width="32" height="32" style="border-radius: 6px; object-fit: cover;">
          </div>
          <span class="navbar-title">Chen Explore</span>
        </a>

        <button class="navbar-toggle" id="navbar-toggle" aria-label="Toggle navigation">
          <span class="hamburger-line"></span>
          <span class="hamburger-line"></span>
          <span class="hamburger-line"></span>
        </button>

        <div class="navbar-links" id="navbar-links">
          <a href="/" data-link class="nav-link ${currentPath === '/' ? 'active' : ''}" id="nav-home">Home</a>
          <a href="/submit" data-link class="nav-link ${currentPath === '/submit' ? 'active' : ''}" id="nav-submit">Submit Project</a>
        </div>
      </div>
    </nav>
  `;
}

export function initNavbar() {
  const toggle = document.getElementById('navbar-toggle');
  const links = document.getElementById('navbar-links');

  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
      toggle.classList.toggle('active');
    });
  }

  // Close mobile menu on link click
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (links) links.classList.remove('open');
      if (toggle) toggle.classList.remove('active');
    });
  });

  // Navbar scroll effect
  window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (navbar) {
      if (window.scrollY > 10) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
  });
}
