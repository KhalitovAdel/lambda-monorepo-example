/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Context, Handler } from 'aws-lambda';
import { createServer, proxy } from 'aws-serverless-express';
import { eventContext } from 'aws-serverless-express/middleware';

import { name, version } from '../package.json';
import { AppModule } from './app/app.module';

let server;
const binaryMimeTypes: string[] = [];

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.use(eventContext());

    const options = new DocumentBuilder()
      .setTitle('Cats example')
      .setDescription('The cats API description')
      .setVersion('1.0')
      .addTag('cats')
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('/swagger/projects/swagger', app, document);

    await app.init();
    
    const expressApp = app.getHttpAdapter().getInstance();

    return server ?? createServer(expressApp, undefined, binaryMimeTypes);
}

export const handler: Handler = async (event: unknown, context: Context) => {
    return proxy(await bootstrap(), event, context, 'PROMISE').promise;
};
