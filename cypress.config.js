
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'se2yoh',
  allowCypressEnv: false,

  viewportWidth: 1920,
  viewportHeight: 1080,

  // Tempo de espera
  defaultCommandTimeout: 30000,
  pageLoadTimeout: 120000,
  requestTimeout: 30000,
  responseTimeout: 60000,

  // Novas tentativas em caso de falha
  retries: {
    runMode: 2,
    openMode: 0,
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
