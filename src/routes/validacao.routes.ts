import express from "express";
import knex from "knex";
import knexConfig from "../../knexfile";
import bcrypt from "bcryptjs";

export const validateRouter = express.Router();

const db = knex(knexConfig.development);

validateRouter.post("/", async (req, res) => {
  const { produto } = req.body ?? {};

  if (!produto)
    return res.status(400).json({ messageError: "server cant read id field" });

  try {
    const { keyAccess } = produto;

    produto.keyAccess = await bcrypt.hash(produto.keyAccess, 8);

    const newProduct = await db("tabela-produtos").insert(produto, ["id"]);

    res.json({ value: newProduct });
  } catch (error) {
    res.status(500).json({ messageError: error });
  }
});

validateRouter.get("/:descricao", async (req, res) => {
  const { descricao } = req.params;

  console.log(descricao);

  try {
    const getKeyAccess = await db("tabela-produtos")
      .select("*")
      .where({ descricao });

    if (!(await bcrypt.compare(descricao, getKeyAccess[0].keyAccess)))
      return res.json({ message: "Acesso negado!" });

    return res.json({ message: "Acesso permitido!" });
  } catch (error) {}
});
