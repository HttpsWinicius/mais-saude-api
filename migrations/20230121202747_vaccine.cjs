/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    knex.schema.hasTable('tbl_vaccine').then(function (exists) {
        if (!exists) {
            return knex.schema.createTable('tbl_vaccine', function (table) {
                table.increments('id').primary();
                table.string('name', 170).notNullable();
                table.integer('periodicity', 6);
                table.timestamp('created_at', { precision: 6 }).defaultTo(knex.fn.now(6));
            });
        }
    })

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {

};
