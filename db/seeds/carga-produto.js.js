/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("tabela-produtos").del();
  await knex("tabela-produtos").insert([
    { id: 1, descricao: "Macbook Air", marca: "Apple", preco: 6.999 },
    { id: 2, descricao: "Macbook Pro", marca: "Apple", preco: 8.999 },
    { id: 3, descricao: "Iphone 14 Pro Max", marca: "Apple", preco: 7.999 },
    { id: 4, descricao: "Watch Ultra", marca: "Apple", preco: 6.999 },
  ]);
};
