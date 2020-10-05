import { BadRequestException } from '@nestjs/common';

export class UserNotFound extends BadRequestException {
    constructor() {
        super(`This email isn't registered in our system.`);
    }
}
