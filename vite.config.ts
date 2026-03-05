import { defineConfig } from 'vite';

export default defineConfig({
    server: {
        // SPA fallback — redirect all routes to index.html
        historyApiFallback: true,
    },
    appType: 'spa',
});
