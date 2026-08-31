import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import userRoutes from './routes/user.routes';
import teacherRoutes from './routes/teacher.routes';
import classRoutes from './routes/class.routes';
import rubricaRoutes from './routes/rubrica.routes';
import { getOpenApiSpec } from './openapi';

dotenv.config();

const app = express();
app.use(cors({ origin: true, credentials: true }));
const port = Number(process.env.BACKEND_PORT ?? 5000);

app.use(express.json());

app.get('/', (_req, res) => {
  res.send('Hello from TypeScript!');
});

app.use('/api', userRoutes);
app.use('/api', teacherRoutes);
app.use('/api', classRoutes);
app.use('/api', rubricaRoutes);

const openapiSpec = getOpenApiSpec();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpec));
app.get('/api-docs.json', (_req, res) => {
  res.json(openapiSpec);
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
