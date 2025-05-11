import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({
    plugins: [react()],
    base: './', // wichtig für VSCode Webviews!
    build: {
        outDir: '../out', // oder '../dist', je nachdem was du willst
        emptyOutDir: true,
    },
});
//# sourceMappingURL=vite.config.js.map