import { BadRequestException } from '@nestjs/common';

export class UserPasswordEmpty extends BadRequestException {
    constructor() {
        super(`Your password cannot be empty`);
    }
}
