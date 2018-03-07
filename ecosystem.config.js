module.exports = {
  apps: [
    {
      name: 'COMMON',
      script: 'yarn',
      args: 'run watch',
      cwd: './common',
    },
    {
      name: 'API',
      script: 'yarn',
      args: 'run dev',
      cwd: './api',
    },
    {
      name: 'WEB',
      script: 'yarn',
      args: 'run dev',
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
