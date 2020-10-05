import { BadRequestException } from '@nestjs/common';

export class CodeNotFound extends BadRequestException {
    constructor() {
        super(`The reset code you are trying to use is not working. It either has been used before, or has a typo.`);
    }
}
