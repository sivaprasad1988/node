const reqHandler = (req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === "/") {
    res.write(
      `
    <html>
      <head>
        <title>Assignemnt 1 </title>
    </head>
            <body>
            <h1> This is assignemnt 1 </h1>
            <form method="POST" action="/create-user">
            <input type="text" name="username" />
            <input type="submit" />
            </form>
            </body>
    </html>`
    );
    return res.end();
  }

  if (url === "/create-user") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });

    return req.on("end", () => {
      const parseBody = Buffer.concat(body).toString();
      const message = parseBody.split("=")[1];
      res.writeHead("302", {
        Location: "/",
      });
      console.log(message);

      return message;
    });
    return res.end();
  }

  if (url === "/users") {
    res.write(
      `<html>
                <head>
                <title>Hello</title>
                </head>
                <body>
                <ul>
    <li>User 1</li>
    <li>User 1</li>
    <li>User 1</li>
    <li>User 1</li>
    <li>User 1</li>
</ul>

                </body>
                 </html>`
    );
    return res.end();
  }

  res.setHeader("Content-Type", "text/html");
  res.write(
    `<html>
          <head>
          <title>Hello</title></head>
          <body>Hello </body>
          </html>`
  );
  res.end();
};

module.exports = reqHandler;
