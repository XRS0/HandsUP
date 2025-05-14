CREATE TABLE IF NOT EXISTS tokens (
    user_id VARCHAR(36) PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    token_type VARCHAR(10) NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_tokens_expires_at ON tokens(expires_at);
CREATE INDEX idx_tokens_token_type ON tokens(token_type); 