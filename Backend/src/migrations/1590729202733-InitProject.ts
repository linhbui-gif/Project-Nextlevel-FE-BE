import {MigrationInterface, QueryRunner} from "typeorm";

export class InitProject1590729202733 implements MigrationInterface {
    name = 'InitProject1590729202733'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `project` (`createdDate` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedDate` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `id` varchar(36) NOT NULL, `name` varchar(255) NOT NULL, UNIQUE INDEX `IDX_dedfea394088ed136ddadeee89` (`name`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP INDEX `IDX_dedfea394088ed136ddadeee89` ON `project`");
        await queryRunner.query("DROP TABLE `project`");
    }

}
