import { BadRequestException } from '@nestjs/common';

export class ProjectNameNotUnique extends BadRequestException {
    constructor() {
        super(`This project should have a unique name.`);
    }
}
