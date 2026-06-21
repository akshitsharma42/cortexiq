<div align="center">

# 🧠 CortexIQ

**AI Operating System for Organizational Knowledge**

Ask anything. Get answers from your organizational knowledge instantly.

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-000000?logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![Express](https://img.shields.io/badge/Express-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![FastAPI](https://img.shields.io/badge/FastAPI-009688?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)

</div>

---

## Overview

CortexIQ is an AI-powered knowledge platform that connects scattered organizational information — documents, meetings, code repositories — into a single intelligent layer.

**Key Capabilities:**

- 📄 **Document Intelligence** — Upload PDFs, DOCX, and text files. Ask questions, get cited answers.
- 🎙️ **Meeting Intelligence** — Transcribe recordings, extract summaries and action items.
- 🔗 **Repository Intelligence** — Connect GitHub/GitLab repos and search code semantically.
- 🔍 **Semantic Search** — Find information across all sources using natural language.
- 👥 **Team Collaboration** — Shared workspaces with role-based access.

---

## Architecture

```
Browser (Next.js) → Express API → MongoDB / Redis / Cloudinary
                                 → FastAPI → Qdrant / LLM Providers
```

| Service | Tech | Purpose |
|---------|------|---------|
| `apps/web` | Next.js + TypeScript | Frontend application |
| `apps/api` | Express + TypeScript | REST API backend |
| `apps/ai` | FastAPI + Python | AI/ML service (RAG, embeddings) |

---

## Monorepo Structure

```
cortexiq/
├── apps/
│   ├── web/              # Next.js frontend
│   ├── api/              # Express backend
│   └── ai/               # FastAPI AI service
├── packages/
│   ├── shared-types/     # TypeScript type definitions
│   ├── shared-config/    # Shared ESLint, TSConfig, Prettier
│   └── shared-utils/     # Common utility functions
├── infrastructure/
│   ├── docker/           # Docker configurations
│   ├── deployment/       # Deployment scripts and configs
│   └── monitoring/       # Monitoring and alerting setup
├── docs/                 # Project documentation
└── .github/              # GitHub Actions and templates
```

---

## Getting Started

### Prerequisites

- **Node.js** ≥ 20.0.0
- **pnpm** ≥ 9.0.0
- **Python** ≥ 3.12
- **Docker** & Docker Compose

### Setup

```bash
# Clone the repository
git clone https://github.com/akshitsharma42/cortexiq.git
cd cortexiq

# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env

# Start development
pnpm dev
```

---

## Development

```bash
# Run all apps in development mode
pnpm dev

# Build all apps
pnpm build

# Run linting
pnpm lint

# Type checking
pnpm type-check

# Format code
pnpm format

# Clean all build artifacts
pnpm clean
```

---

## Branch Strategy

| Branch | Purpose |
|--------|---------|
| `main` | Production-ready code |
| `develop` | Integration branch for features |
| `feature/*` | Individual feature branches |
| `hotfix/*` | Critical production fixes |

---

## Documentation

Detailed documentation is available in the [`docs/`](./docs) directory:

- [Vision](./docs/vision.md) — Problem, solution, and mission
- [Requirements](./docs/requirements.md) — Feature requirements by tier
- [Features](./docs/features.md) — Module breakdown with priorities
- [Architecture](./docs/architecture.md) — System design and tech decisions
- [Database Design](./docs/database-design.md) — Entity relationships
- [API Design](./docs/api-design.md) — API module structure
- [Roadmap](./docs/roadmap.md) — Development phases and timeline

---

## License

This project is proprietary and confidential.

---

<div align="center">

Built with ❤️ by the CortexIQ team

</div>
