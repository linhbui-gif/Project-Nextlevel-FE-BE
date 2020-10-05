import { BadRequestException } from '@nestjs/common';

export class CodeExpired extends BadRequestException {
    constructor() {
        super(`The reset code you are trying to use is not working. The reset code has expired.`);
    }
}
