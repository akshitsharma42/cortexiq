# CortexIQ – Roadmap

---

## Phase 1: Project Setup

**Goal:** Establish the development foundation.

- [x] Create project documentation (vision, requirements, features, architecture)
- [ ] Install development tools (Node.js, Python, Git, Docker)
- [ ] Create GitHub repository
- [ ] Initial commit with docs
- [ ] Monorepo setup (Turborepo)
- [ ] Frontend app scaffold (Next.js)
- [ ] Backend app scaffold (Express.js)
- [ ] AI service scaffold (FastAPI)
- [ ] Docker Compose for local development
- [ ] Environment configuration (.env files)
- [ ] ESLint + Prettier configuration
- [ ] Shared packages (types, utils, config)

**Estimated Duration:** 1 week

---

## Phase 2: Authentication

**Goal:** Users can register, login, and manage sessions.

- [ ] MongoDB connection and configuration
- [ ] User model and schema
- [ ] Registration endpoint (email + password)
- [ ] Login endpoint with JWT
- [ ] Refresh token rotation
- [ ] Logout and session invalidation
- [ ] Google OAuth integration
- [ ] Password reset flow
- [ ] Email verification
- [ ] Auth middleware (protect routes)
- [ ] Frontend: Login page
- [ ] Frontend: Register page
- [ ] Frontend: Auth state management
- [ ] Frontend: Protected route wrapper
- [ ] Rate limiting on auth endpoints

**Estimated Duration:** 1.5 weeks

---

## Phase 3: Workspace System

**Goal:** Users can create and manage isolated workspaces.

- [ ] Workspace model and schema
- [ ] CRUD endpoints for workspaces
- [ ] Workspace membership model
- [ ] Invite flow (email invitation)
- [ ] Role-based access control (RBAC)
- [ ] Workspace context middleware
- [ ] Frontend: Workspace selector
- [ ] Frontend: Workspace settings page
- [ ] Frontend: Member management UI
- [ ] Per-tier workspace limits

**Estimated Duration:** 1 week

---

## Phase 4: Upload System

**Goal:** Users can upload documents to their workspace.

- [ ] Cloudinary integration
- [ ] File upload endpoint (multipart)
- [ ] File validation (type, size)
- [ ] Document model and schema
- [ ] Upload progress tracking
- [ ] Document listing and management
- [ ] Frontend: Upload UI (drag-and-drop)
- [ ] Frontend: File listing with status
- [ ] Storage quota enforcement
- [ ] Document deletion (file + metadata)

**Estimated Duration:** 1 week

---

## Phase 5: AI Chat (Core Feature)

**Goal:** Users can ask questions and get AI answers with citations.

- [ ] FastAPI service setup
- [ ] Document text extraction (PDF, DOCX, TXT, MD)
- [ ] Text chunking strategy
- [ ] Embedding generation (OpenAI / open-source)
- [ ] Qdrant vector storage
- [ ] RAG pipeline (retrieve → augment → generate)
- [ ] Chat endpoint with streaming (SSE)
- [ ] Citation extraction and formatting
- [ ] Conversation model and schema
- [ ] Message model and schema
- [ ] Message rate limiting per tier
- [ ] Frontend: Chat interface
- [ ] Frontend: Message streaming UI
- [ ] Frontend: Citation display
- [ ] Frontend: Conversation sidebar
- [ ] Follow-up context management

**Estimated Duration:** 2–3 weeks

---

## Phase 6: Agents & Intelligence

**Goal:** Extend AI capabilities with meeting and repository intelligence.

- [ ] Meeting upload endpoint
- [ ] Audio transcription (Whisper / AssemblyAI)
- [ ] Meeting summary generation
- [ ] Action item extraction
- [ ] Meeting transcript to knowledge base
- [ ] GitHub/GitLab repository connection
- [ ] Repository code indexing
- [ ] Code embedding and vector storage
- [ ] Cross-source search (docs + meetings + repos)
- [ ] Frontend: Meeting intelligence UI
- [ ] Frontend: Repository connection UI
- [ ] Frontend: Global search

**Estimated Duration:** 2–3 weeks

---

## Phase 7: Payments

**Goal:** Users can subscribe to Pro/Enterprise plans.

- [ ] Stripe integration
- [ ] Pricing page
- [ ] Checkout session creation
- [ ] Webhook handler (subscription events)
- [ ] Subscription model and schema
- [ ] Tier enforcement middleware
- [ ] Frontend: Pricing page
- [ ] Frontend: Billing settings
- [ ] Frontend: Usage dashboard
- [ ] Free trial implementation

**Estimated Duration:** 1.5 weeks

---

## Phase 8: Deployment & Production

**Goal:** Ship CortexIQ to production.

- [ ] Production Docker images
- [ ] CI/CD pipeline (GitHub Actions)
- [ ] Vercel deployment (frontend)
- [ ] Railway/Render deployment (backend + AI)
- [ ] MongoDB Atlas setup
- [ ] Redis Cloud setup
- [ ] Qdrant Cloud setup
- [ ] Domain and SSL configuration
- [ ] Environment variable management
- [ ] Health check endpoints
- [ ] Monitoring and alerting (uptime)
- [ ] Error tracking (Sentry)
- [ ] Logging infrastructure
- [ ] Performance optimization
- [ ] Security audit
- [ ] Landing page
- [ ] Launch 🚀

**Estimated Duration:** 1–2 weeks

---

## Total Estimated Timeline

| Phase | Duration |
|-------|----------|
| Phase 1: Project Setup | 1 week |
| Phase 2: Authentication | 1.5 weeks |
| Phase 3: Workspace System | 1 week |
| Phase 4: Upload System | 1 week |
| Phase 5: AI Chat | 2–3 weeks |
| Phase 6: Agents & Intelligence | 2–3 weeks |
| Phase 7: Payments | 1.5 weeks |
| Phase 8: Deployment | 1–2 weeks |
| **Total** | **~11–14 weeks** |

---

## Post-Launch Roadmap

- Analytics dashboard (Module 11)
- SSO / SAML support
- API access for Enterprise
- Slack / Teams integration
- Advanced admin controls
- Multi-language support
- Mobile app (React Native)
- On-premise deployment option
