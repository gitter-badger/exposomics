const http = require('http');
const httpProxy = require('http-proxy');
const HttpProxyRules = require('http-proxy-rules');

const proxyRules = new HttpProxyRules({
  rules: {
    '/api/(.+)': 'http://localhost:3001/$1',
  },
  default: 'http://localhost:3000', // default target
});

const proxy = httpProxy.createProxy();
const server = http.createServer((req, res) => {
  const target = proxyRules.match(req);
  if (target) {
    return proxy.web(req, res, {
      target: target,
    });
  }

  res.writeHead(500, { 'Content-Type': 'text/plain' });
  res.end('The request url and path did not match any of the listed rules!');
});

server.listen(process.env.PORT || 4000, () => {
  console.log(`Listening on ${process.env.PORT || 4000}`);
});
