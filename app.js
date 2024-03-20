const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === "/") {
    res.write(
      `<html>
        <head>
        <title>Hello</title>
        </head>
        <body>
        <form method="POST" action="/message">
            <input type="text" name="message" />
            <input type="submit" />
        </form>
        </body>
         </html>`
    );
    return res.end();
  }

  if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });

    return req.on("end", () => {
      const parseBody = Buffer.concat(body).toString();
      const message = parseBody.split("=")[1];
      fs.writeFile("mydata.txt", message, (err) => {
        res.writeHead("302", {
          Location: "/",
        });
        return res.end();
      });
    });
  }
  res.setHeader("Content-Type", "text/html");
  res.write(
    "<html><head><title>Hello</title></head><body>Hello </body></html>"
  );
  res.end();
});

server.listen(3000);
