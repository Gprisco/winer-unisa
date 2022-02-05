import readSqlFile from '../helpers/readSqlFile';
import { MigrationInterface, QueryRunner } from 'typeorm';
import { join } from 'path';

export class WineDataMigration1644064605083 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    const queries = readSqlFile(join(__dirname, 'populate.sql'));

    for (const query of queries) await queryRunner.query(query);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    // const queries = readSqlFile(join(__dirname, 'truncate.sql'));
    // for (const query of queries) await queryRunner.query(query);
  }
}
