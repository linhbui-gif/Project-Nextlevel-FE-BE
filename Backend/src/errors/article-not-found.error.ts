import { BadRequestException } from '@nestjs/common';

export class ArticleNotFound extends BadRequestException {
    constructor() {
        super(`This article could not be found. Either it has moved to a different location, or it does not exist anymore.`);
    }
}
