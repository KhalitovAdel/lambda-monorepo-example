import { Body, Controller, Get, Logger, Param, Patch, Post } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

import { Entity } from './app.entity';
import { CreateDto } from './dto/create.dto';
import { ParamIdDto } from './dto/param-id.dto';
import { UpdateDto } from './dto/update.dto';
import {  name } from '../../package.json'; 
 
@Controller(name)   
export class AppController {
    private readonly logger = new Logger(name);
    private readonly db = new Array<Entity>();
    constructor() {
        this.db.push(new Entity('1', '9999'), new Entity('2', '99999'));
    }

    @ApiResponse({ type: Entity })
    @Post()
    create(@Body() payload: CreateDto): Entity {
        if (!Entity.canBeCreated(payload))
            throw new Error('Not null expected 1');
        const entity = new Entity(payload.name, payload.customerId);
        this.db.push(entity);

        return entity;
    }

    @ApiResponse({ type: Entity })
    @Patch(':id')
    update(@Param() param: ParamIdDto, @Body() payload: UpdateDto): Entity {
        const entity = this.db.find((el) => el.getId() === param.id);
        if (!entity) throw new Error('Not null expected 2');

        entity.update(payload);

        return entity;
    }

    @ApiResponse({ type: Entity })
    @Get(':id')
    get(@Param() param: ParamIdDto): Entity {
        this.logger.log(param) 
        const entity = this.db.find((el) => el.getId() === param.id);
        if (!entity) throw new Error('Not null expected 3');

        return entity;
    }

    @ApiResponse({ type: Entity, isArray: true })
    @Get()
    list(): Entity[] {
        return this.db;
    }
}
         