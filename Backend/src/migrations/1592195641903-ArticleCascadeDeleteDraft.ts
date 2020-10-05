import {MigrationInterface, QueryRunner} from "typeorm";

export class ArticleCascadeDeleteDraft1592195641903 implements MigrationInterface {
    name = 'ArticleCascadeDeleteDraft1592195641903'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `draft` DROP FOREIGN KEY `FK_46c1f65a7feaeb3558dec4a72dc`");
        await queryRunner.query("ALTER TABLE `article` DROP FOREIGN KEY `FK_da6bf786dda07c306dad8661b05`");
        await queryRunner.query("ALTER TABLE `draft` ADD CONSTRAINT `FK_46c1f65a7feaeb3558dec4a72dc` FOREIGN KEY (`articleId`) REFERENCES `article`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `article` ADD CONSTRAINT `FK_da6bf786dda07c306dad8661b05` FOREIGN KEY (`draftId`) REFERENCES `draft`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `article` DROP FOREIGN KEY `FK_da6bf786dda07c306dad8661b05`");
        await queryRunner.query("ALTER TABLE `draft` DROP FOREIGN KEY `FK_46c1f65a7feaeb3558dec4a72dc`");
        await queryRunner.query("ALTER TABLE `article` ADD CONSTRAINT `FK_da6bf786dda07c306dad8661b05` FOREIGN KEY (`draftId`) REFERENCES `draft`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `draft` ADD CONSTRAINT `FK_46c1f65a7feaeb3558dec4a72dc` FOREIGN KEY (`articleId`) REFERENCES `article`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

}
