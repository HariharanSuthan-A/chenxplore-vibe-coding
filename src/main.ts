import './style.css';
import { registerRoutes, initRouter } from './router';
import { LandingPage, initLandingPage } from './pages/Landing';
import { SubmitPage, initSubmitPage } from './pages/Submit';

// Register routes
registerRoutes([
  {
    path: '/',
    render: LandingPage,
    afterRender: initLandingPage,
  },
  {
    path: '/submit',
    render: SubmitPage,
    afterRender: initSubmitPage,
  },
]);

// Initialize router
initRouter();
