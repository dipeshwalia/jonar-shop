import { MigrationInterface, QueryRunner } from 'typeorm';
const { v4: uuidv4 } = require('uuid');
import { faker } from '@faker-js/faker';

// idea for this migration is to seed some default products and catagories.
export class seed1647997801611 implements MigrationInterface {
  name = 'seed1647997801611';

  public async up(queryRunner: QueryRunner): Promise<void> {
    for await (const _iterator of [...Array(10).keys()]) {
      await queryRunner.query(
        `INSERT INTO category (id, name, description) VALUES ('${uuidv4()}', '${faker.commerce.department()}', '${faker.random.word()}')`,
      );
    }

    for await (const _iterator of [...Array(10).keys()]) {
      await queryRunner.query(
        `INSERT INTO product (id, name, description, price, count, sku, image) VALUES ('${uuidv4()}', '${faker.commerce.product()}', '${faker.random.word()}', ${faker.commerce.price()}, ${faker.datatype.number()}, ${faker.datatype.number()}, '${faker.image.imageUrl()}')`,
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
