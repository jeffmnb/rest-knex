import express from "express";

import { router as produtosRouter } from "./routes/produtos.routes";

const app = express();

app.use("/produtos", produtosRouter);

app.listen(3000, () => {
  console.log("server running on port 3000");
});
