module.exports = {
  apps: [
    {
      name: 'API',
      script: 'yarn',
      args: 'start',
      cwd: './api',
    },
    {
      name: 'WEB',
      script: 'yarn',
      args: 'start',
      cwd: './frontend',
    },
    {
      name: 'PROXY',
      script: 'yarn',
      args: 'start',
      cwd: './proxy',
    },
  ],
};
