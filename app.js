const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");

const dirPath = path.join(__dirname, "/templates");

//read html file
let file2send = fs.readFileSync(`${dirPath}/page.html`);

const server = http.createServer((req, res) => {
  const urlObj = url.parse(req.url);
  const pathname = urlObj.pathname;

  if (pathname.match("[.]html$")) {
    res.writeHead(200, "OK", { "content-type": "text/html" });
    const reader = fs.createReadStream(
      path.join(__dirname, "templates", pathname)
    );
    reader.pipe(res);
  } else if (pathname.match("[.]css$")) {
    res.writeHead(200, "OK", { "content-type": "text/css" });
    const reader = fs.createReadStream(
      path.join(__dirname, "templates", pathname)
    );
    reader.pipe(res);
  } else {
    res.writeHead(404, "Not found", { "content-type": "text/html" });
    const error = "<h1>Page Not Found</h1>";
    res.end(error);
  }
});

server.listen(3000, () => {});
