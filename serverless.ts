import type { Serverless } from 'serverless/aws';

const serverlessConfiguration: Serverless = {
    service: {
        name: 'serverless-todo',
    },
    plugins: [
        'serverless-offline',
        'serverless-plugin-monorepo',
        'serverless-plugin-optimize',
    ],
    provider: {
        name: 'aws',
        runtime: 'nodejs12.x',
    },
    functions: {
        projects: {
            handler: './dist/apps/projects/main.handler',
            events: [
                {
                    http: {
                        method: 'get',
                        path: `/projects`,
                    },
                },
                {
                    http: {
                        method: 'get',
                        path: `/projects/{param}`,
                    },
                },
                {
                    http: {
                        method: 'post',
                        path: `/projects/{param}`,
                    },
                },
                {
                    http: {
                        method: 'patch',
                        path: `/projects/{param}`,
                    },
                },
                {
                    http: {
                        method: 'any',
                        path: `/swagger/projects/swagger-json/{any+}`,
                    },
                },
                {
                    http: {
                        method: 'any',
                        path: `/swagger/projects/swagger-json`,
                    },
                },
            ],
        },
        dumploads: {
            handler: './dist/apps/dumploads/main.handler',
            events: [
                {
                    http: {
                        method: 'get',
                        path: `/dumploads`,
                    },
                },
                {
                    http: {
                        method: 'get',
                        path: `/dumploads/{param}`,
                    },
                },
                {
                    http: {
                        method: 'post',
                        path: `/dumploads/{param}`,
                    },
                },
                {
                    http: {
                        method: 'patch',
                        path: `/dumploads/{param}`,
                    },
                },
                {
                    http: {
                        method: 'any',
                        path: `/swagger/dumploads/swagger-json/{any+}`,
                    },
                },
                {
                    http: {
                        method: 'any',
                        path: `/swagger/dumploads/swagger-json`,
                    },
                },
            ],
        },
        'projects-dumploads': {
            handler: './dist/apps/project-dumpload/main.handler',
            events: [
                {
                    http: {
                        method: 'get',
                        path: `/projects/{param}/dumploads/{dumploadId}`,
                    },
                },
                {
                    http: {
                        method: 'any',
                        path: `/swagger/projects-dumploads/swagger-json`,
                    },
                },
            ],
        },
    },
};

module.exports = serverlessConfiguration;
