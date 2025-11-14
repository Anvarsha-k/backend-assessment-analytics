📊 Website Analytics Backend API

A scalable backend service for collecting, storing, and analyzing high-volume analytics events from websites and mobile apps.
This system supports API key authentication, event ingestion, aggregation insights, Redis caching, rate limiting, Docker deployment, and Swagger API documentation.

🚀 Features
🔐 API Key Management

Register new applications

Auto-generate API keys

Retrieve API keys

Revoke API keys

Middleware for validating API keys

📥 Event Tracking

Ingests:

Clicks

Page visits

Referrer data

Device/browser/OS metadata

IP address

Custom user metadata

High-volume ingestion supported

📈 Analytics Reporting

Event-based summary

Device breakdown

Unique user counts

User-level analytics

Date-range filtering

Redis caching for faster repeated queries

🏗️ Tech Stack
Layer	Technology
Backend	Node.js + Express
Database	PostgreSQL (Sequelize ORM)
Cache	Redis
Auth	API Keys
Deployment	Docker + Render/Railway
Docs	Swagger
Testing	Jest + Supertest
📁 Project Structure
backend-assessment-analytics/
├── src/
│   ├── controllers/
│   ├── services/
│   ├── middlewares/
│   ├── models/
│   ├── utils/
│   ├── db/
│   └── server.js
├── docker-compose.yaml
├── Dockerfile
├── swagger.yaml
└── README.md

⚙️ Environment Variables
PORT=5000

DB_HOST=db
DB_USER=postgres
DB_PASS=postgres
DB_NAME=analytics
DB_PORT=5432

REDIS_HOST=redis
REDIS_PORT=6379

RATE_LIMIT_POINTS=20
RATE_LIMIT_DURATION=1

🐳 Run Using Docker
docker-compose up --build


This starts:

Node.js API

PostgreSQL

Redis

📘 API Documentation (Swagger)

Once server is running:

/docs

🔑 API Authentication

All analytics endpoints require:

x-api-key: <your_api_key>

🔐 API Key Endpoints
Register App
POST /api/auth/register

Get API Key
GET /api/auth/api-key

Revoke API Key
POST /api/auth/revoke

🎯 Event Collection Endpoint
POST /api/analytics/collect


Example:

{
  "event": "login_click",
  "url": "https://example.com",
  "referrer": "https://google.com",
  "device": "mobile",
  "userId": "user123",
  "metadata": { "browser": "Chrome" }
}

📊 Analytics Endpoints
Event Summary
GET /api/analytics/event-summary?event=login_click

User Stats
GET /api/analytics/user-stats?userId=user123

🚀 Deployment URL
https://backend-assessment-analytics-1.onrender.com

🎥 Loom Demo

https://www.loom.com/share/7901cbbd433a44acbb4395914228d872

📌 Challenges Solved

Designed event schema optimized for large-scale ingestion

Implemented Redis caching for heavy analytics queries

Added rate limiting to prevent abuse

API key authentication flow

Containerized full stack for deployment

Clean modular architecture

🔮 Future Enhancements

Time-series graphs

Geo-based analytics

Event batching

Real-time dashboards

Anomaly detection