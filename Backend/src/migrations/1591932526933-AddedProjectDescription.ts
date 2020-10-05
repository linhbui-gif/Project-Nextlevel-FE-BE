import {MigrationInterface, QueryRunner} from "typeorm";

export class AddedProjectDescription1591932526933 implements MigrationInterface {
    name = 'AddedProjectDescription1591932526933'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `project` ADD `description` varchar(255) NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `project` DROP COLUMN `description`");
    }

}
