const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");
const dirPath = path.join(__dirname, "templates");

const server = http.createServer((req, res) => {
  const urlObj = url.parse(req.url);
  const pathname = urlObj.pathname;

  //if pathname / we load the home page
  if (pathname === "/") {
    res.writeHead(200, "OK", { "content-type": "text/html" });
    const reader = fs.createReadStream(path.join(dirPath, "page.html"));
    reader.pipe(res);
  }

  //if request path was ending with an html we load it
  else if (pathname.match("[.]html$")) {
    res.writeHead(200, "OK", { "content-type": "text/html" });
    const reader = fs.createReadStream(path.join(dirPath, pathname));
    reader.pipe(res);
  }

  //if it ends with css with load it
  else if (pathname.match("[.]css$")) {
    res.writeHead(200, "OK", { "content-type": "text/css" });
    const reader = fs.createReadStream(path.join(dirPath, pathname));
    reader.pipe(res);
  }

  //if it doesnt match any of what we're able to load then it'll send a not found page
  else {
    res.writeHead(404, "Not found", { "content-type": "text/html" });
    const error = "<h1>Page Not Found</h1>";
    res.end(error);
  }
});

server.listen(3000, () => {});
