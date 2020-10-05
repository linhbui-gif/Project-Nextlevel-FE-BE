import { BadRequestException } from '@nestjs/common';

export class ArticleUrlNotUnique extends BadRequestException {
    constructor() {
        super(`This slug is already taken, please try another one`);
    }
}
