import {MigrationInterface, QueryRunner} from "typeorm";

export class AddedImageGalleryToProject1594635206609 implements MigrationInterface {
    name = 'AddedImageGalleryToProject1594635206609'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `project` ADD `imageGallery` text NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `project` DROP COLUMN `imageGallery`");
    }

}
