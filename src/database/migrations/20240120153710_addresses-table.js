/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.createTableIfNotExists('addresses', (table) => {
    table.uuid('id').primary();
    table.uuid('accountId').unsigned();
    table.foreign('accountId').references('id').inTable('accounts');
    table.string('street');
    table.integer('houseNumber');
    table.integer('apartmentNumber');
    table.string('city');
    table.string('postalCode');
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.dropTableIfExists('addresses');
}
