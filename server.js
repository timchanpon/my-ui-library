const fs = require('fs');
const http = require('http');

const server = http.createServer();

server.on('request', function(req, res)
{
  const path = req.url;

  if (path === '/') {
    res.writeHead(302, { 'Location': '/index.html' });
    res.end();

    return console.log(`Request [302]: ${path}`);
  } else if (path === '/favicon.ico') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Favicon is unavailable.');

    return console.log(`Request [200]: ${path}`);
  }

  const file = `dist${path}`;
  const fileType = path.split('.').pop();

  fs.readFile(file, 'utf-8', (err, data) => {
    if (!data) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Something went wrong. Please check the log.');

      return console.log(`Request [404]: ${path}\n${err}`);
    }

    res.writeHead(200, { 'Content-Type': `text/${fileType}` });
    res.write(data);
    res.end();

    console.log(`Request [200]: ${path}`);
  });
});

server.listen(80, '0.0.0.0', () => {
  console.log('Server running at http://localhost:3000/');
});
