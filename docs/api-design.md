# CortexIQ – API Design

## API Modules

> **Note:** This document lists API module groupings only.
> Specific endpoints, request/response schemas, and status codes will be defined when each module is implemented.

---

### Auth APIs

Handle user authentication and session management.

- Registration
- Login
- Logout
- Token refresh
- Google OAuth
- Password reset
- Email verification

---

### User APIs

Manage user profile and settings.

- Get current user
- Update profile
- Change password
- Delete account
- Get user sessions

---

### Workspace APIs

CRUD operations for workspaces and membership.

- Create workspace
- List workspaces
- Get workspace
- Update workspace
- Delete workspace
- Invite member
- Remove member
- Update member role

---

### Document APIs

File upload and document management.

- Upload document
- List documents
- Get document
- Delete document
- Get document status
- Re-process document

---

### Chat APIs

AI conversation interactions.

- Send message (with streaming)
- Get conversation messages
- Rate message (feedback)

---

### Conversation APIs

Manage conversation threads.

- Create conversation
- List conversations
- Get conversation
- Rename conversation
- Delete conversation
- Pin/unpin conversation

---

### Meeting APIs

Meeting recording management and intelligence.

- Upload meeting recording
- List meetings
- Get meeting details
- Get meeting transcript
- Get meeting summary
- Get action items
- Delete meeting

---

### Repository APIs

Code repository connection and management.

- Connect repository
- List repositories
- Get repository status
- Sync repository
- Disconnect repository

---

### Search APIs

Semantic and hybrid search.

- Search documents
- Search meetings
- Search repositories
- Global search (cross-source)

---

### Payment APIs

Subscription and billing management.

- Get pricing plans
- Create checkout session
- Get subscription status
- Cancel subscription
- Get billing history
- Stripe webhook handler

---

### Analytics APIs

Usage and insights data.

- Get usage stats
- Get popular queries
- Get knowledge gaps
- Get team activity

---

### Notification APIs

User notifications.

- List notifications
- Mark as read
- Mark all as read
- Delete notification

---

## API Conventions

| Convention | Standard |
|------------|----------|
| Protocol | REST over HTTPS |
| Format | JSON |
| Authentication | Bearer token (JWT) |
| Versioning | URL prefix (`/api/v1/`) |
| Pagination | Cursor-based |
| Error format | `{ error: { code, message, details } }` |
| Rate limiting | Token bucket per user tier |
| Streaming | Server-Sent Events (SSE) for AI responses |

---

## API Base URLs

| Environment | URL |
|-------------|-----|
| Development | `http://localhost:5000/api/v1` |
| Staging | `https://staging-api.cortexiq.com/api/v1` |
| Production | `https://api.cortexiq.com/api/v1` |

---

## AI Service (Internal)

| Environment | URL |
|-------------|-----|
| Development | `http://localhost:8000/api/v1` |
| Staging | `https://staging-ai.cortexiq.com/api/v1` |
| Production | `https://ai.cortexiq.com/api/v1` |

> The AI service is **internal only** — never exposed directly to the browser.
