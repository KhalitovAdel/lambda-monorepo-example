import { ProjectApi } from '@kek/generated';
import { Controller, Get, Param } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import fetch from 'isomorphic-fetch';

import { name } from '../../package.json';
import { Entity } from './app.entity';
import { ParamIdDto } from './dto/param-id.dto';

@Controller()
export class AppController {
    private readonly baseUrl = 'http://localhost:3000/dev';
    private readonly projectsApi = new ProjectApi.DefaultApi(
        undefined,
        this.baseUrl,
        fetch
    );

    private readonly dumpLoadsApi = new ProjectApi.DefaultApi(
        undefined,
        this.baseUrl,
        fetch
    );

    @ApiResponse({ type: Entity })
    @Get(`${name}/:projectId/dumploads/:dumploadsId`)
    async get(@Param() param: ParamIdDto): Promise<unknown> {
        const [project, dumploads] = await Promise.all([
            this.projectsApi.appControllerGet('1'),
            this.dumpLoadsApi.appControllerList(),
        ]);

        return {
            ...project,
            dumploads,
        };
    }
}
