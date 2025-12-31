# Backend Service

A minimal backend service built with Node.js and Fastify.

## Prerequisites

- Node.js 18 or higher
- npm or yarn
- Docker (optional, for containerized deployment)

## API Endpoints

### `GET /health`
Returns the health status of the service.

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2025-01-01T12:00:00.000Z",
  "uptime": 123.456,
  "environment": "development"
}
```

### `POST /jobs`
Creates a new job and returns a mock job ID.

**Request:**
```json
{
  "task": "process data",
  "data": {}
}
```

**Response:**
```json
{
  "jobId": "38d45207-2e70-4366-b148-b27f221a0838",
  "status": "pending",
  "createdAt": "2025-01-01T12:00:00.000Z"
}
```

## Running Locally

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment

Create a `.env` file from the example:

```bash
cp .env.example .env
```

Edit `.env` if needed (defaults work fine):
```bash
PORT=3000
HOST=0.0.0.0
NODE_ENV=development
LOG_LEVEL=info
```

### 3. Start the Server

**Development mode** (with auto-reload):
```bash
npm run dev
```

**Production mode**:
```bash
npm start
```

The server will start on `http://localhost:3000`

### 4. Test the API

```bash
# Health check
curl http://localhost:3000/health

# Create a job
curl -X POST http://localhost:3000/jobs \
  -H "Content-Type: application/json" \
  -d '{"task": "process data"}'
```

## Running with Docker

### 1. Build the Docker Image

```bash
cd backend
docker build -t backend-service .
```

### 2. Run the Container

**Basic run:**
```bash
docker run -p 3000:3000 backend-service
```

**With custom environment variables:**
```bash
docker run -p 3000:3000 \
  -e PORT=3000 \
  -e LOG_LEVEL=debug \
  -e NODE_ENV=production \
  backend-service
```

**Run in detached mode (background):**
```bash
docker run -d -p 3000:3000 --name my-backend backend-service
```

### 3. Manage the Container

```bash
# View logs
docker logs my-backend

# Follow logs in real-time
docker logs -f my-backend

# Stop the container
docker stop my-backend

# Start the container
docker start my-backend

# Remove the container
docker rm my-backend

# View running containers
docker ps
```

### 4. Test the Dockerized API

```bash
# Health check
curl http://localhost:3000/health

# Create a job
curl -X POST http://localhost:3000/jobs \
  -H "Content-Type: application/json" \
  -d '{"task": "test"}'
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `3000` |
| `HOST` | Server host | `0.0.0.0` |
| `NODE_ENV` | Environment (development/production) | `development` |
| `LOG_LEVEL` | Logging level (trace/debug/info/warn/error) | `info` |

## License

MIT