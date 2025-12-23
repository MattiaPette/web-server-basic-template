interface Config {
  port: number;
  nodeEnv: string;
  debug: boolean;
  cors: {
    origin: string;
  };
}

const config: Config = {
  port: Number(process.env.BACKEND_PORT) || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  debug: process.env.DEBUG === 'true',
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  },
};

export default config;
