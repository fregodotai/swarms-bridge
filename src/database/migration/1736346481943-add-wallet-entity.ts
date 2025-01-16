import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddWalletEntity1736346481943 implements MigrationInterface {
  name = 'AddWalletEntity1736346481943';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`api_key\` DROP FOREIGN KEY \`FK_1c184bad1b1eef0c40c3fcc3800\``,
    );
    await queryRunner.query(
      `CREATE TABLE \`wallet\` (\`id\` varchar(36) NOT NULL, \`publicKey\` varchar(255) NOT NULL, \`encryptedPrivateKey\` text NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(`ALTER TABLE \`api_key\` DROP COLUMN \`agentId\``);
    await queryRunner.query(
      `ALTER TABLE \`agent\` ADD \`apiKeyId\` varchar(36) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`agent\` ADD UNIQUE INDEX \`IDX_faeac8819bb0bc5a6880dba097\` (\`apiKeyId\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`agent\` ADD \`walletId\` varchar(36) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`agent\` ADD UNIQUE INDEX \`IDX_4f34df4bf7ca4d55dc81a9ae5d\` (\`walletId\`)`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`REL_faeac8819bb0bc5a6880dba097\` ON \`agent\` (\`apiKeyId\`)`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`REL_4f34df4bf7ca4d55dc81a9ae5d\` ON \`agent\` (\`walletId\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`agent\` ADD CONSTRAINT \`FK_faeac8819bb0bc5a6880dba097a\` FOREIGN KEY (\`apiKeyId\`) REFERENCES \`api_key\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`agent\` ADD CONSTRAINT \`FK_4f34df4bf7ca4d55dc81a9ae5d9\` FOREIGN KEY (\`walletId\`) REFERENCES \`wallet\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`agent\` DROP FOREIGN KEY \`FK_4f34df4bf7ca4d55dc81a9ae5d9\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`agent\` DROP FOREIGN KEY \`FK_faeac8819bb0bc5a6880dba097a\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_4f34df4bf7ca4d55dc81a9ae5d\` ON \`agent\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_faeac8819bb0bc5a6880dba097\` ON \`agent\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`agent\` DROP INDEX \`IDX_4f34df4bf7ca4d55dc81a9ae5d\``,
    );
    await queryRunner.query(`ALTER TABLE \`agent\` DROP COLUMN \`walletId\``);
    await queryRunner.query(
      `ALTER TABLE \`agent\` DROP INDEX \`IDX_faeac8819bb0bc5a6880dba097\``,
    );
    await queryRunner.query(`ALTER TABLE \`agent\` DROP COLUMN \`apiKeyId\``);
    await queryRunner.query(
      `ALTER TABLE \`api_key\` ADD \`agentId\` varchar(36) NULL`,
    );
    await queryRunner.query(`DROP TABLE \`wallet\``);
    await queryRunner.query(
      `ALTER TABLE \`api_key\` ADD CONSTRAINT \`FK_1c184bad1b1eef0c40c3fcc3800\` FOREIGN KEY (\`agentId\`) REFERENCES \`agent\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }
}
