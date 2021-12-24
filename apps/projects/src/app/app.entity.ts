import { ApiProperty } from '@nestjs/swagger';

import { CreateDto } from './dto/create.dto';
import { UpdateDto } from './dto/update.dto';

let currentId = 1;

export class Entity {
    @ApiProperty()
    private readonly id: string;

    @ApiProperty()
    private name: string;

    @ApiProperty()
    private customerId: string;

    constructor(name: CreateDto['name'], customerId: CreateDto['customerId']) {
        this.name = name;
        this.customerId = customerId;
        this.id = String(currentId);
        currentId += 1;
    }

    getId(): string {
        return this.id;
    }

    public update(toUpdate: UpdateDto): this {
        if (toUpdate.customerId) this.customerId = toUpdate.customerId;
        if (toUpdate.name) this.name = toUpdate.name;

        return this;
    }

    public static canBeCreated(toCreate: CreateDto): boolean {
        return !!toCreate;
    }
}
