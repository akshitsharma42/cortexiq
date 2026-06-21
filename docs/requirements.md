# CortexIQ – Requirements

## User Tiers & Feature Access

---

### Guest (No Account)

| Requirement | Description |
|-------------|-------------|
| Landing page | Marketing page with product overview, pricing, and CTA |
| Demo chat | 2 free AI messages to experience the product |
| PDF upload | Upload a single PDF and ask questions about it |
| Sign up | Create account via email or Google OAuth |

---

### Free User

| Requirement | Description |
|-------------|-------------|
| AI chat | 10 messages per day |
| Workspace | 1 personal workspace |
| Document upload | Upload up to 10 documents (PDF, DOCX, TXT, MD) |
| File size limit | Max 10MB per file |
| Storage | 100MB total storage |
| Conversations | Unlimited conversation threads |
| Search | Basic semantic search across uploaded documents |
| Citations | Source references with every AI answer |
| Profile management | Edit profile, change password, manage sessions |

---

### Pro User ($19/month)

| Requirement | Description |
|-------------|-------------|
| AI chat | Unlimited messages |
| Workspaces | Up to 5 workspaces |
| Document upload | Unlimited documents |
| File size limit | Max 50MB per file |
| Storage | 10GB total storage |
| Repository intelligence | Connect GitHub/GitLab repositories |
| Meeting intelligence | Upload meeting recordings, get summaries and action items |
| Advanced search | Semantic search with filters, date ranges, source types |
| Conversation history | Full searchable history |
| Priority processing | Faster document ingestion |
| Export | Export conversations and search results |

---

### Enterprise (Custom Pricing)

| Requirement | Description |
|-------------|-------------|
| Everything in Pro | All Pro features included |
| Unlimited workspaces | No workspace limits |
| Unlimited storage | No storage limits |
| Team collaboration | Invite team members, role-based access |
| Admin dashboard | User management, usage analytics, audit logs |
| Analytics | Knowledge gap analysis, usage patterns, popular queries |
| SSO | SAML/OIDC single sign-on |
| API access | REST API for integrations |
| Custom integrations | Slack, Teams, Jira, Confluence connectors |
| Data residency | Choose data storage region |
| SLA | 99.9% uptime guarantee |
| Dedicated support | Priority support channel |

---

## Non-Functional Requirements

### Performance

- AI response time: < 3 seconds for simple queries
- Document processing: < 60 seconds for a 50-page PDF
- Search results: < 500ms
- Page load time: < 2 seconds (LCP)

### Security

- All data encrypted at rest (AES-256) and in transit (TLS 1.3)
- JWT-based authentication with refresh token rotation
- Rate limiting on all API endpoints
- Input sanitization and XSS/CSRF protection
- SOC 2 Type II compliance (roadmap)

### Scalability

- Horizontal scaling for API and AI services
- Document processing queue with backpressure handling
- CDN for static assets
- Database indexing strategy for sub-100ms queries

### Reliability

- Health check endpoints for all services
- Graceful degradation when AI providers are down
- Automatic retry with exponential backoff
- Circuit breaker pattern for external dependencies

### Observability

- Structured logging (JSON format)
- Request tracing with correlation IDs
- Error tracking and alerting
- Performance metrics dashboard
