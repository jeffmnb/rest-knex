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
