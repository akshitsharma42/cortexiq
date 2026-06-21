# CortexIQ – Architecture

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────┐
│                        Browser                          │
│                   (React / Next.js)                     │
└────────────────────────┬────────────────────────────────┘
                         │
                         │ HTTPS
                         ▼
┌─────────────────────────────────────────────────────────┐
│                     Next.js App                         │
│              (SSR + Client + API Routes)                │
│                                                         │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐             │
│  │  Pages   │  │Components│  │  Hooks   │             │
│  └──────────┘  └──────────┘  └──────────┘             │
└────────────────────────┬────────────────────────────────┘
                         │
                         │ REST API
                         ▼
┌─────────────────────────────────────────────────────────┐
│                    Express API                          │
│               (Node.js Backend)                         │
│                                                         │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐             │
│  │  Routes  │  │Controllers│ │Middleware │             │
│  └──────────┘  └──────────┘  └──────────┘             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐             │
│  │ Services │  │  Models  │  │Validators│             │
│  └──────────┘  └──────────┘  └──────────┘             │
└──────┬──────────────┬──────────────┬────────────────────┘
       │              │              │
       ▼              ▼              ▼
┌────────────┐ ┌────────────┐ ┌────────────┐
│  MongoDB   │ │   Redis    │ │ Cloudinary │
│            │ │            │ │            │
│ - Users    │ │ - Sessions │ │ - Files    │
│ - Docs     │ │ - Cache    │ │ - Images   │
│ - Messages │ │ - Rate     │ │ - Uploads  │
│ - Payments │ │   Limits   │ │            │
└────────────┘ └────────────┘ └────────────┘
                         │
                         │ Internal API
                         ▼
┌─────────────────────────────────────────────────────────┐
│                    FastAPI                              │
│               (Python AI Service)                       │
│                                                         │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐             │
│  │  Routes  │  │ Services │  │ Workers  │             │
│  └──────────┘  └──────────┘  └──────────┘             │
│  ┌──────────┐  ┌──────────┐                            │
│  │Embeddings│  │  Chains  │                            │
│  └──────────┘  └──────────┘                            │
└──────┬──────────────┬───────────────────────────────────┘
       │              │
       ▼              ▼
┌────────────┐ ┌────────────────┐
│   Qdrant   │ │ LLM Providers  │
│            │ │                │
│ - Vectors  │ │ - OpenAI       │
│ - Search   │ │ - Anthropic    │
│ - Filters  │ │ - Google AI    │
└────────────┘ └────────────────┘
```

---

## Service Responsibilities

### Next.js (Frontend)

- Server-side rendering for SEO pages (landing, pricing, blog)
- Client-side SPA for authenticated pages (dashboard, chat, settings)
- API route proxying to Express backend
- Authentication state management
- Real-time UI updates via WebSocket/SSE

### Express API (Backend)

- REST API for all business logic
- Authentication and authorization
- Database CRUD operations
- File upload orchestration
- Payment processing (Stripe)
- WebSocket server for real-time features
- Job queue management (BullMQ)
- Rate limiting and request validation

### FastAPI (AI Service)

- Document text extraction and chunking
- Embedding generation
- Vector storage and retrieval (Qdrant)
- RAG pipeline (retrieval + generation)
- Meeting transcription processing
- Repository code indexing
- LLM provider abstraction layer

### MongoDB (Primary Database)

- User accounts and profiles
- Workspaces and memberships
- Documents metadata
- Conversations and messages
- Subscriptions and payments
- Notifications

### Redis (Cache & Sessions)

- Session storage
- Rate limit counters
- API response caching
- Job queue backend (BullMQ)
- Real-time pub/sub

### Qdrant (Vector Database)

- Document chunk embeddings
- Semantic search index
- Meeting transcript embeddings
- Code embeddings
- Filtered vector search

### Cloudinary (File Storage)

- Document file storage
- Meeting recording storage
- Profile image storage
- CDN delivery

---

## Communication Patterns

```
Browser ──── HTTPS ────→ Next.js
Next.js ──── REST ─────→ Express API
Express ──── REST ─────→ FastAPI
Express ──── TCP ──────→ MongoDB
Express ──── TCP ──────→ Redis
Express ──── HTTPS ────→ Cloudinary
Express ──── HTTPS ────→ Stripe
FastAPI ──── gRPC ─────→ Qdrant
FastAPI ──── HTTPS ────→ LLM APIs
Express ──── WebSocket → Browser (real-time)
Express ──── SSE ──────→ Browser (streaming)
```

---

## Deployment Architecture (Production)

```
┌──────────────┐
│   Vercel     │ ← Next.js Frontend
└──────┬───────┘
       │
       ▼
┌──────────────┐     ┌──────────────┐
│  Railway /   │     │  Railway /   │
│  Render      │     │  Render      │
│  (Express)   │     │  (FastAPI)   │
└──────┬───────┘     └──────┬───────┘
       │                     │
       ▼                     ▼
┌──────────────┐     ┌──────────────┐
│ MongoDB Atlas│     │ Qdrant Cloud │
└──────────────┘     └──────────────┘
┌──────────────┐     ┌──────────────┐
│ Redis Cloud  │     │  Cloudinary  │
└──────────────┘     └──────────────┘
```

---

## Key Design Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Frontend framework | Next.js 14+ (App Router) | SSR for SEO, React ecosystem, API routes |
| Backend framework | Express.js | Mature, flexible, large ecosystem |
| AI service | FastAPI (Python) | Python ML ecosystem, async support, type safety |
| Primary database | MongoDB | Flexible schema for evolving product, JSON-native |
| Vector database | Qdrant | Purpose-built for vectors, filtering, Rust performance |
| Cache | Redis | Industry standard, BullMQ integration, pub/sub |
| File storage | Cloudinary | CDN built-in, transformation APIs, generous free tier |
| Payments | Stripe | Industry standard, excellent DX, webhook support |
| Monorepo tool | Turborepo | Fast builds, caching, simple configuration |
| Package manager | pnpm | Disk efficient, strict, fast |
