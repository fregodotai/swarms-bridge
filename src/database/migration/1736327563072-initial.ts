import { MigrationInterface, QueryRunner } from 'typeorm';

export class Initial1736327563072 implements MigrationInterface {
  name = 'Initial1736327563072';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`agent\` (\`id\` varchar(36) NOT NULL, \`agentId\` int NOT NULL, \`name\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_5e23a168ceafc7036e0e3de0bf\` (\`agentId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`api_key\` (\`id\` varchar(36) NOT NULL, \`apiKey\` varchar(255) NOT NULL, \`status\` enum ('active', 'inactive') NOT NULL DEFAULT 'active', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`agentId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`api_key\` ADD CONSTRAINT \`FK_1c184bad1b1eef0c40c3fcc3800\` FOREIGN KEY (\`agentId\`) REFERENCES \`agent\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`api_key\` DROP FOREIGN KEY \`FK_1c184bad1b1eef0c40c3fcc3800\``,
    );
    await queryRunner.query(`DROP TABLE \`api_key\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_5e23a168ceafc7036e0e3de0bf\` ON \`agent\``,
    );
    await queryRunner.query(`DROP TABLE \`agent\``);
  }
}
