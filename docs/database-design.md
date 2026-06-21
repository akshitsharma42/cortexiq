# CortexIQ – Database Design

## Entities

> **Note:** This document lists entities and their relationships only.
> Schemas (field types, indexes, constraints) will be defined in Phase 2.

---

### User

The person using CortexIQ.

- Owns workspaces
- Has a subscription
- Belongs to workspaces (as member)
- Creates conversations
- Sends messages
- Uploads documents

---

### Workspace

An isolated environment for organizing knowledge.

- Belongs to a User (owner)
- Has many Members (users)
- Has many Documents
- Has many Conversations
- Has many Meetings
- Has many Repositories

---

### Document

A file uploaded to a workspace for AI processing.

- Belongs to a Workspace
- Uploaded by a User
- Has many Chunks (processed segments)
- Has processing status

---

### Chunk

A processed segment of a document stored as a vector embedding.

- Belongs to a Document
- Stored in Qdrant (vector DB)
- Referenced in MongoDB (metadata)

---

### Conversation

A chat thread between a user and AI within a workspace.

- Belongs to a Workspace
- Created by a User
- Has many Messages

---

### Message

A single message in a conversation (human or AI).

- Belongs to a Conversation
- Sent by a User (or AI)
- May have Citations (source references)

---

### Meeting

A meeting recording uploaded for transcription and analysis.

- Belongs to a Workspace
- Uploaded by a User
- Has a Transcript
- Has a Summary
- Has Action Items

---

### Repository

A connected code repository (GitHub/GitLab).

- Belongs to a Workspace
- Connected by a User
- Has indexing status
- Has many indexed files

---

### Subscription

A user's payment plan.

- Belongs to a User
- Has a plan tier (free, pro, enterprise)
- Has billing period
- Linked to Stripe

---

### Payment

A record of a financial transaction.

- Belongs to a User
- Associated with a Subscription
- Linked to Stripe invoice

---

### Notification

A system or user notification.

- Belongs to a User
- Has type (system, workspace, mention)
- Has read/unread status

---

## Entity Relationship Overview

```
User ──────────── 1:N ──────────── Workspace (as owner)
User ──────────── N:M ──────────── Workspace (as member)
User ──────────── 1:1 ──────────── Subscription
User ──────────── 1:N ──────────── Payment
User ──────────── 1:N ──────────── Notification

Workspace ─────── 1:N ──────────── Document
Workspace ─────── 1:N ──────────── Conversation
Workspace ─────── 1:N ──────────── Meeting
Workspace ─────── 1:N ──────────── Repository

Document ──────── 1:N ──────────── Chunk

Conversation ──── 1:N ──────────── Message
Message ───────── 1:N ──────────── Citation (embedded)
```

---

## Storage Strategy

| Entity | Primary Store | Secondary Store |
|--------|--------------|-----------------|
| User | MongoDB | — |
| Workspace | MongoDB | — |
| Document (metadata) | MongoDB | — |
| Document (file) | Cloudinary | — |
| Chunk (metadata) | MongoDB | — |
| Chunk (vector) | Qdrant | — |
| Conversation | MongoDB | — |
| Message | MongoDB | — |
| Meeting (metadata) | MongoDB | — |
| Meeting (recording) | Cloudinary | — |
| Repository | MongoDB | — |
| Subscription | MongoDB | Stripe |
| Payment | MongoDB | Stripe |
| Notification | MongoDB | Redis (real-time) |
| Sessions | Redis | — |
| Rate limits | Redis | — |
