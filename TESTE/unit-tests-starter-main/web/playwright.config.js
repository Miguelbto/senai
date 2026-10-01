import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './e2e',
    workers: 1, //roda 1 teste de cada vez
    reporter: 'html',
    use: {
        baseURL: 'http://localhost:5173',
    },
    projects: [{
        name: 'chromium', use: { ...devices['Desktop Chrome'] }
    }],
    webServer: [{
        command: "npm run api: e2e",
        cwd: "..",
        url: "http://localhost:3000/produtos",
        reuseExistingServer: false,
    }, {
        command: 'npm run dev',
        url: 'http://localhost:5173',
        reuseExistingServer: false,
    }]
})