const http = require('http');
const fs = require('fs');

const server = http.createServer();

server.on('request', function(req, res)
{
	console.log(`Request: ${req.url}`);

	if (req.url === '/favicon.ico') {
		return res.writeHead(200, { 'Content-Type': 'text/plain' })
							.end('Favicon is unavailable.');
	}

	const fileType = req.url.split('.').pop();
	const file = `dist${req.url}`;
	const contentType = `text/${fileType}`;

	fs.readFile(file, 'utf-8', (err, data) => {
		if (!data) {
			console.error(err);

			return res.writeHead(404, { 'Content-Type': 'text/plain' })
								.end('Something went wrong. Please check the log.');
		}

		res.writeHead(200, { 'Content-Type': contentType });
		res.write(data);
		res.end();
	});
});

server.listen(80, '0.0.0.0', () => {
	console.log(`Server running at http://localhost:3000/`);
});
