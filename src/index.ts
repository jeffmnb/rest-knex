import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.status(200).send("<h1>Olá, seja bem vindo!</h1>");
});

app.listen(3000, () => {
  console.log("server running on port 3000");
});
