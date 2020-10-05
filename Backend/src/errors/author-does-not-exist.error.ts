import { BadRequestException } from '@nestjs/common';

export class AuthorDoesNotExist extends BadRequestException {
    constructor() {
        super(`The author of this article could not be found`);
    }
}
