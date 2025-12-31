// server.js
import Fastify from 'fastify';
import { randomUUID } from 'crypto';

const fastify = Fastify({
  logger: {
    level: process.env.LOG_LEVEL || 'info',
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname'
      }
    }
  }
});

// Config
const config = {
  port: parseInt(process.env.PORT || '3000'),
  host: process.env.HOST || '0.0.0.0',
  env: process.env.NODE_ENV || 'development'
};

// Health check endpoint
fastify.get('/health', async (req, reply) => {
  return {
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: config.env
  };
});

// Create job endpoint
fastify.post('/jobs', async (req, reply) => {
  const jobId = randomUUID();
  
  fastify.log.info({ jobId, body: req.body }, 'Job created');
  
  return {
    jobId,
    status: 'pending',
    createdAt: new Date().toISOString()
  };
});

// Start server
const start = async () => {
  try {
    await fastify.listen({ port: config.port, host: config.host });
    fastify.log.info(`Server running on ${config.host}:${config.port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

// Graceful shutdown
const shutdown = async (signal) => {
  fastify.log.info(`${signal} received, shutting down gracefully`);
  await fastify.close();
  process.exit(0);
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

start();