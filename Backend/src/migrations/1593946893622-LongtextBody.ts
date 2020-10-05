import {MigrationInterface, QueryRunner} from "typeorm";

export class LongtextBody1593946893622 implements MigrationInterface {
    name = 'LongtextBody1593946893622'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` ADD `bio` text NULL");
        await queryRunner.query("ALTER TABLE `project` DROP COLUMN `description`");
        await queryRunner.query("ALTER TABLE `project` ADD `description` longtext NOT NULL");
        await queryRunner.query("ALTER TABLE `draft` DROP COLUMN `body`");
        await queryRunner.query("ALTER TABLE `draft` ADD `body` longtext NOT NULL");
        await queryRunner.query("ALTER TABLE `article` DROP COLUMN `body`");
        await queryRunner.query("ALTER TABLE `article` ADD `body` longtext NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `article` DROP COLUMN `body`");
        await queryRunner.query("ALTER TABLE `article` ADD `body` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `draft` DROP COLUMN `body`");
        await queryRunner.query("ALTER TABLE `draft` ADD `body` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `project` DROP COLUMN `description`");
        await queryRunner.query("ALTER TABLE `project` ADD `description` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `bio`");
    }

}
