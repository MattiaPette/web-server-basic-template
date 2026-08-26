import openapiSpec from './openapi.json';

export const getOpenApiSpec = () => ({
  ...openapiSpec,
  servers: [
    {
      url: `http://localhost:${process.env.BACKEND_PORT ?? 5000}`,
      description: 'Server di sviluppo locale',
    },
  ],
});
