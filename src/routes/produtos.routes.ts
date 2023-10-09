import express from "express";
import knex from "knex";
import knexConfig from "../../knexfile";
import { ProductData } from "./produtos.types";
import { validateProductValues } from "./utils";

const db = knex(knexConfig.development);

export const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const produtos = await db("tabela-produtos").select("*");
    res.status(200).json(produtos);
  } catch (error) {
    res.status(500).json({ error: `EndPoint out with error: ${error}` });
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
    return res.status(400).json({ messageError: "server cant read id field" });

  try {
    const newProduct = await db("tabela-produtos").insert(produto, ["id"]);

    res.json({ value: newProduct });
  } catch (error) {
    res.status(500).json({ messageError: error });
  }
});

router.put("/update/:id", async (req, res) => {
  const { id } = req?.params ?? {};
  const data: ProductData = req?.body;

  if (!validateProductValues(data))
    return res.status(400).json({ message: "missing required arguments" });

  if (!id)
    return res.status(400).json({ messageError: "server cant read id field" });

  try {
    const verifyId = await db("tabela-produtos").where({ id });

    if (!verifyId.length)
      return res
        .status(404)
        .json({ message: `not fount any product with id ${id}` });

    await db("tabela-produtos").where({ id }).update(data);

    res.status(201).json({ message: "product updated!" });
  } catch (error) {
    res.status(500).json({ messageError: error });
  }
});

router.delete("/delete/:id", async (req, res) => {
  const { id } = req?.params ?? {};

  if (!id)
    return res.status(400).json({ messageError: "server cant read id field" });

  try {
    const verifyId = await db("tabela-produtos").where({ id });

    if (!verifyId.length)
      return res
        .status(404)
        .json({ message: `not fount any product with id ${id}` });

    await db("tabela-produtos").where({ id }).del();
    res.status(200).json({ message: "product deleted!" });
  } catch (error) {
    res.status(500).json({ messageError: error });
  }
});
