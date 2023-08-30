import express from "express";
import knex from "knex";
import knexConfig from "../../knexfile";

const db = knex(knexConfig.development);

export const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const produtos = await db("tabela-produtos").select("*");
    res.status(200).json(produtos);
  } catch (error) {
    res.status(500).json({ error: `EndPoint fora com erro: ${error}` });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  if (!id)
    return res.status(400).json({ messageError: "server cant read id field" });

  try {
    const produtos = await db("tabela-produtos").select("*").where({ id });

    if (!produtos.length)
      return res.status(404).json({ messageError: "product not found" });

    res.status(200).json({ produto: produtos[0] });
  } catch (error) {
    res.status(500).json({ messageError: error });
  }
});

router.post("/insert", async (req, res) => {
  const { produto } = req?.body ?? {};

  if (!produto)
    return res.status(400).json({ messageError: "server cant read product" });

  try {
    const newProduct = await db("tabela-produtos").insert(produto, ["id"]);

    res.json({ value: newProduct });
  } catch (error) {
    res.status(500).json({ messageError: error });
  }
});
