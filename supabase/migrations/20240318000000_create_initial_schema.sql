-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enum for user types
CREATE TYPE user_type AS ENUM ('Admin', 'Client');

-- Create companies table
CREATE TABLE companies (
    id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    company_name VARCHAR(255) NOT NULL,
    company_address TEXT,
    company_contact_number VARCHAR(50),
    company_email VARCHAR(255),
    company_email_key VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create users table
CREATE TABLE users (
    id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    user_type user_type NOT NULL,
    company BIGINT REFERENCES companies(id),
    user_role VARCHAR(100),
    fname VARCHAR(100),
    lname VARCHAR(100),
    contact_number VARCHAR(50),
    address TEXT,
    last_login TIMESTAMP WITH TIME ZONE,
    online SMALLINT DEFAULT 0 CHECK (online IN (0, 1)),
    status VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create password reset tokens table
CREATE TABLE password_reset_tokens (
    email VARCHAR(255) PRIMARY KEY REFERENCES users(email) ON DELETE CASCADE,
    token VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW() + INTERVAL '1 hour') NOT NULL
);

-- Create indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_company ON users(company);
CREATE INDEX idx_companies_name ON companies(company_name);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_companies_updated_at
    BEFORE UPDATE ON companies
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Create RLS policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE password_reset_tokens ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view their own data"
    ON users FOR SELECT
    USING (auth.uid()::text = email);

CREATE POLICY "Admins can view all users"
    ON users FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM users
            WHERE users.email = auth.uid()::text
            AND users.user_type = 'Admin'
        )
    );

-- Companies policies
CREATE POLICY "Users can view their company"
    ON companies FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM users
            WHERE users.company = companies.id
            AND users.email = auth.uid()::text
        )
    );

CREATE POLICY "Admins can view all companies"
    ON companies FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM users
            WHERE users.email = auth.uid()::text
            AND users.user_type = 'Admin'
        )
    );

-- Password reset tokens policies
CREATE POLICY "Users can view their own reset tokens"
    ON password_reset_tokens FOR SELECT
    USING (auth.uid()::text = email);