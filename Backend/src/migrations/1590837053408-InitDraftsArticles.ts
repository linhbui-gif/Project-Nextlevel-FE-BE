import {MigrationInterface, QueryRunner} from "typeorm";

export class InitDraftsArticles1590837053408 implements MigrationInterface {
    name = 'InitDraftsArticles1590837053408'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `draft` (`createdDate` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedDate` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `id` varchar(36) NOT NULL, `title` varchar(255) NOT NULL, `slug` varchar(255) NOT NULL, `body` varchar(255) NOT NULL, `articleId` varchar(36) NULL, `authorId` varchar(36) NULL, UNIQUE INDEX `IDX_835c720ebaab50750089a7567f` (`slug`), UNIQUE INDEX `REL_46c1f65a7feaeb3558dec4a72d` (`articleId`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `article` (`createdDate` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedDate` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `id` varchar(36) NOT NULL, `title` varchar(255) NOT NULL, `slug` varchar(255) NOT NULL, `body` varchar(255) NOT NULL, `authorId` varchar(36) NULL, `draftId` varchar(36) NULL, UNIQUE INDEX `IDX_0ab85f4be07b22d79906671d72` (`slug`), UNIQUE INDEX `REL_da6bf786dda07c306dad8661b0` (`draftId`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `draft` ADD CONSTRAINT `FK_46c1f65a7feaeb3558dec4a72dc` FOREIGN KEY (`articleId`) REFERENCES `article`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `draft` ADD CONSTRAINT `FK_87eeb049832589bb723934177e6` FOREIGN KEY (`authorId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `article` ADD CONSTRAINT `FK_a9c5f4ec6cceb1604b4a3c84c87` FOREIGN KEY (`authorId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `article` ADD CONSTRAINT `FK_da6bf786dda07c306dad8661b05` FOREIGN KEY (`draftId`) REFERENCES `draft`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `article` DROP FOREIGN KEY `FK_da6bf786dda07c306dad8661b05`");
        await queryRunner.query("ALTER TABLE `article` DROP FOREIGN KEY `FK_a9c5f4ec6cceb1604b4a3c84c87`");
        await queryRunner.query("ALTER TABLE `draft` DROP FOREIGN KEY `FK_87eeb049832589bb723934177e6`");
        await queryRunner.query("ALTER TABLE `draft` DROP FOREIGN KEY `FK_46c1f65a7feaeb3558dec4a72dc`");
        await queryRunner.query("DROP INDEX `REL_da6bf786dda07c306dad8661b0` ON `article`");
        await queryRunner.query("DROP INDEX `IDX_0ab85f4be07b22d79906671d72` ON `article`");
        await queryRunner.query("DROP TABLE `article`");
        await queryRunner.query("DROP INDEX `REL_46c1f65a7feaeb3558dec4a72d` ON `draft`");
        await queryRunner.query("DROP INDEX `IDX_835c720ebaab50750089a7567f` ON `draft`");
        await queryRunner.query("DROP TABLE `draft`");
    }

}
