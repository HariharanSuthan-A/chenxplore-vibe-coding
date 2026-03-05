// Simple client-side router
type Route = {
    path: string;
    render: () => string;
    afterRender?: () => void;
};

let routes: Route[] = [];
let currentCleanup: (() => void) | null = null;

export function registerRoutes(routeList: Route[]) {
    routes = routeList;
}

export function navigateTo(path: string) {
    window.history.pushState({}, '', path);
    renderCurrentRoute();
}

export function renderCurrentRoute() {
    const path = window.location.pathname;
    const route = routes.find(r => r.path === path) || routes.find(r => r.path === '/');

    if (route) {
        const app = document.getElementById('app');
        if (app) {
            // Run any cleanup from previous route
            if (currentCleanup) {
                currentCleanup();
                currentCleanup = null;
            }
            app.innerHTML = route.render();
            if (route.afterRender) {
                route.afterRender();
            }
        }
    }
}

export function initRouter() {
    window.addEventListener('popstate', () => {
        renderCurrentRoute();
    });

    // Intercept link clicks
    document.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        const anchor = target.closest('a[data-link]');
        if (anchor) {
            e.preventDefault();
            const href = anchor.getAttribute('href');
            if (href) {
                navigateTo(href);
            }
        }
    });

    renderCurrentRoute();
}
