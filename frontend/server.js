import jsonServer from "json-server";
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const port = 3001;

server.use(middlewares);

server.use((req, res, next) => {
  res.header("Access-Control-Expose-Headers", "X-Total-Count");
  next();
});

server.use(router);

server.listen(port, () => {
  console.log(`JSON Server (v0.17.4) is running on http://localhost:${port}`);
});
