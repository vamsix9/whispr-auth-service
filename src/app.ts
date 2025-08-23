import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { middleware as openApiValidator } from 'express-openapi-validator';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import { connector } from 'swagger-routes-express';
import * as routes from './routes/index';

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  })
);

app.use(express.json());

// Serve OpenAPI specification file (one level up)
app.use(
  '/openapi.yaml',
  express.static(path.join(__dirname, '../openapi.yaml')),
);

const apiSpec = YAML.load(path.join(__dirname, '../openapi.yaml'));

// Serve Swagger UI for API documentation
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: { url: '/openapi.yaml' }, // This path should match the static file
  }),
);

app.use(
  openApiValidator({
    apiSpec: path.join(__dirname, '../openapi.yaml'), // Path to OpenAPI file (one level up)
    validateRequests: true, // Validate requests (body, query, params)
    validateResponses: true, // Validate responses
  }),
);

// setting up the authentication middleware
app.use('/', async (req: express.Request, res, next: express.NextFunction) => {
  // TODO: later implement authentication here
  return next();
});

// Connect routes from OpenAPI
const connectRoutes = connector(routes as any, apiSpec, {
  onCreateRoute: (method: string, descriptor: any[]) => {
    console.log(`${method}: ${descriptor[0]} : ${(descriptor[1] as any).name}`);
  },
});

// middleware for customising error if request is invalid
app.use(
  (
    err: any,
    _req: express.Request,
    res: express.Response,
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    _next: express.NextFunction,
  ) => {
    console.log(err);
    res.status(err.status).json({
      type: 'request_validation',
      message: err.message,
      errors: err.errors,
    });
  },
);

connectRoutes(app);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
})