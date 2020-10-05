import {MigrationInterface, QueryRunner} from "typeorm";

export class UserRoles1590745615937 implements MigrationInterface {
    name = 'UserRoles1590745615937'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` ADD `roles` set ('admin', 'editor', 'member') NOT NULL DEFAULT 'member'");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `roles`");
    }

}
