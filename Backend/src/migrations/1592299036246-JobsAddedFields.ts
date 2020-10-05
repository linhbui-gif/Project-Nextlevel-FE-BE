import {MigrationInterface, QueryRunner} from "typeorm";

export class JobsAddedFields1592299036246 implements MigrationInterface {
    name = 'JobsAddedFields1592299036246'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `job` ADD `requirements` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `job` ADD `skills` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `job` ADD `interview` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `job` ADD `location` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `job` ADD `minSalary` int NOT NULL");
        await queryRunner.query("ALTER TABLE `job` ADD `maxSalary` int NOT NULL");
        await queryRunner.query("ALTER TABLE `job` ADD `currency` enum ('VND', 'EUR', 'USD', 'SGD') NOT NULL DEFAULT 'VND'");
        await queryRunner.query("ALTER TABLE `job` ADD `type` enum ('fulltime', 'contractor', 'parttime', 'internship') NOT NULL DEFAULT 'fulltime'");
        await queryRunner.query("ALTER TABLE `job` ADD `minExperience` int NOT NULL");
        await queryRunner.query("ALTER TABLE `job` ADD `maxExperience` int NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `job` DROP COLUMN `maxExperience`");
        await queryRunner.query("ALTER TABLE `job` DROP COLUMN `minExperience`");
        await queryRunner.query("ALTER TABLE `job` DROP COLUMN `type`");
        await queryRunner.query("ALTER TABLE `job` DROP COLUMN `currency`");
        await queryRunner.query("ALTER TABLE `job` DROP COLUMN `maxSalary`");
        await queryRunner.query("ALTER TABLE `job` DROP COLUMN `minSalary`");
        await queryRunner.query("ALTER TABLE `job` DROP COLUMN `location`");
        await queryRunner.query("ALTER TABLE `job` DROP COLUMN `interview`");
        await queryRunner.query("ALTER TABLE `job` DROP COLUMN `skills`");
        await queryRunner.query("ALTER TABLE `job` DROP COLUMN `requirements`");
    }

}
