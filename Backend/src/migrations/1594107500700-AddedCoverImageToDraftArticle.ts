import {MigrationInterface, QueryRunner} from "typeorm";

export class AddedCoverImageToDraftArticle1594107500700 implements MigrationInterface {
    name = 'AddedCoverImageToDraftArticle1594107500700'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `draft` ADD `coverImage` text NULL");
        await queryRunner.query("ALTER TABLE `article` ADD `coverImage` text NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `article` DROP COLUMN `coverImage`");
        await queryRunner.query("ALTER TABLE `draft` DROP COLUMN `coverImage`");
    }

}
