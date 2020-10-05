import { BadRequestException } from '@nestjs/common';

export class ArticleAlreadyHasDraft extends BadRequestException {
    constructor() {
        super(`The article you try to save is already associated with another draft.`);
    }
}
