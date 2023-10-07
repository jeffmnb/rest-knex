import express from "express";
import { router as produtosRouter } from "./routes/produtos.routes";
import { validateRouter } from "./routes/validacao.routes";

const app = express();

app.use(express.json());

app.use("/produtos", produtosRouter);
app.use("/validacao", validateRouter);

app.listen(3000, () => {
  console.log("server running on port 3000");
});

