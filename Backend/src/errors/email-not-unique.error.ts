import { BadRequestException } from '@nestjs/common';

export class EmailNotUnique extends BadRequestException {
    constructor(email: string) {
        super([`Email already registered: ${email}`]);
    }
}
