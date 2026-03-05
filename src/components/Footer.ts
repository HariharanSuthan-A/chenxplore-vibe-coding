export function Footer(): string {
  return `
    <footer class="footer">
      <div class="container">
        <div class="footer-inner">
          <div class="footer-brand">
            <div class="footer-logo">
              <img src="/images/logo.jpeg" alt="Chen Explore Logo" width="28" height="28" style="border-radius: 4px; object-fit: cover;">
              <span>Chen Explore-2k26</span>
            </div>
            <p class="footer-tagline">College Symposium Project Competition</p>
          </div>
          <div class="footer-links">
            <a href="/" data-link>Home</a>
            <a href="/submit" data-link>Submit Project</a>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; 2026 Chen Explore-2k26. All rights reserved.</p>
        </div>
      </div>
    </footer>
  `;
}
