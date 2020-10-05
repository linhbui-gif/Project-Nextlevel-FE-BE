import {MigrationInterface, QueryRunner} from "typeorm";

export class AddedCv1593705690905 implements MigrationInterface {
    name = 'AddedCv1593705690905'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` ADD `cv` varchar(255) NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `cv`");
    }

}
