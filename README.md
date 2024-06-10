# High-Level Architecture Diagram

[API docs](https://round-dust-4939.isaac-onuwa.workers.dev/docs)

```md
                                      +---------------------+
                                      |   Web3 Wallets &    |
                                      |   Social Logins     |
                                      +----------+----------+
                                                 |
                                                 v
                                      +----------+----------+
                                      |     Privy Web3      |
                                      |      Client         |
                                      +----------+----------+
                                                 |
                                                 v
                                       +---------+---------+
                                       |   Wrangler API    |
                                       |    (Cloudflare)   |
                                       +---------+---------+
                                                 |
                                                 v
   +-----------------------+       +-------------+-------------+
   |    /exchange endpoint |<----->|    Authentication Service  |
   +-----------------------+       +----------------------------+
                                                 |
                                                 v
                                      +----------+----------+
                                      |  Supabase Database  |
                                      | (User & VM Info)    |
                                      +---------------------+
```

## Components Description

1. **Web3 Wallets & Social Logins**: Users can connect using various Web3 wallets (like MetaMask) or social logins (like Google, Facebook).

2. **Privy Web3 Client**: Handles authentication through Web3 wallets and social logins. It provides a token that needs to be exchanged via the Wrangler API.

3. **Wrangler API (Cloudflare Workers)**: Manages API endpoints, including the `/exchange` endpoint, which exchanges the Privy token for user data and manages VM-related operations.

4. **Authentication Service**: Part of the Wrangler API, handles the exchange of Privy tokens and ensures user authentication. It communicates with the Supabase database to store and retrieve user information.

5. **Supabase Database**: Stores user information, VM instances, and insights. It acts as the backend database, ensuring persistent storage and easy querying.

### Detailed Flow

1. **User Authentication**:
   - User logs in via a Web3 wallet or social login.
   - Privy Web3 Client generates an authentication token.

2. **Token Exchange**:
   - The token is sent to the `/exchange` endpoint of the Wrangler API.
   - The Wrangler API validates the token via the Privy Web3 Client.
   - Upon successful validation, user data is retrieved and stored/updated in the Supabase database.
   - An authentication token is generated and sent back to the client for session management.

3. **VM Management**:
   - Users can perform CRUD operations on VM instances via the Wrangler API.
   - The API endpoints (e.g., `GET /vms`, `POST /vms`, `PUT /vms/:id`) interact with the Supabase database to manage VM data.
   - Each VM instance is linked to a user.

4. **Insights and Monitoring**:
   - Insights related to VM performance (memory, disk usage) are stored in the Supabase database.
   - The data can be fetched via API endpoints for monitoring and visualization purposes.

### API Endpoint Examples

1. **/exchange** (POST):
   - Description: Exchange Privy token for user data.
   - Request Body: `{ token: string }`
   - Response: `{ data: authToken, message: string }`

2. **/instances** (GET):
   - Description: Fetch list of VMs for the authenticated user.
   - Response: `{ data: Vm[], message: string }`

3. **/instances** (POST):
   - Description: Create a new VM instance.
   - Request Body: `{ name: string, cpu: string, memory: number, disk: number, region: string }`
   - Response: `{ data: Vm, message: string }`

4. **/instances/:id** (PUT):
   - Description: Update an existing VM instance.
   - Request Body: Partial `Vm` object
   - Response: `{ data: Vm, message: string }`

5. **/insights** (GET):
   - Description: Fetch insights for VM performance.
   - Response: `{ data: Insight[], message: string }`

### Database Schema (Supabase)

#### Accounts Table

```sql
CREATE TABLE accounts (
    id UUID PRIMARY KEY,
    display_name TEXT,
    created_at TIMESTAMP,
    identifier TEXT,
    user_id TEXT,
    photo_url TEXT,
    provider TEXT
);
```

#### Instances Table

```sql
CREATE TABLE instances (
    id UUID PRIMARY KEY,
    created_at TIMESTAMP,
    last_updated_at TIMESTAMP,
    name TEXT,
    cpu TEXT,
    memory INT,
    disk INT,
    region TEXT,
    status TEXT CHECK (status IN ('RUNNING', 'PAUSED', 'TERMINATED')),
    user_id UUID REFERENCES users(id)
);
```

#### Insights Table

```sql
CREATE TABLE insights (
    id UUID PRIMARY KEY,
    memory TEXT,
    instance UUID REFERENCES vms(id),
    disk TEXT,
    created_at TIMESTAMP
);
```
