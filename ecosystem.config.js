module.exports = {
  apps: [{
    name: "zuelpay",
    script: "npm",
    args: "start",
    max_memory_restart: "200M", // Restarts if memory usage is too high
    autorestart: true,        // Automatically restarts if the app crashes
    env: {
      NODE_ENV: "production"
    }
  }] }