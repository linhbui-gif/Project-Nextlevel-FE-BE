import {MigrationInterface, QueryRunner} from "typeorm";

export class AddCodeToUser1594116874407 implements MigrationInterface {
    name = 'AddCodeToUser1594116874407'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` ADD `code` varchar(255) NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `code`");
    }

}
