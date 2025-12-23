import dotenv from 'dotenv';
import express from 'express';
import userRoutes from './routes/user.routes';

dotenv.config();

const app = express();
const port = Number(process.env.BACKEND_PORT ?? 5000);

app.use(express.json());

app.get('/', (_req, res) => {
  res.send('Hello from TypeScript!');
});

app.use('/api', userRoutes);

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
