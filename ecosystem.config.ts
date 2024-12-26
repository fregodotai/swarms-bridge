/* eslint-disable */
module.exports = {
  apps: [
    {
      name: 'fxn-connector',
      script: './dist/index.js',
      instances: '1',
      exec_mode: 'cluster',
      max_restarts: 10,
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
