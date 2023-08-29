/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("tabela-produtos", (field) => {
    field.increments("id");
    field.text("descricao", 255).unique().notNullable();
    field.text("marca", 128).notNullable();
    field.decimal("preco").notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {};
