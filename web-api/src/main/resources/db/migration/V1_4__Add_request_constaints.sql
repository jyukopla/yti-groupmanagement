ALTER TABLE request ALTER COLUMN role_name SET NOT NULL;
ALTER TABLE request ADD CONSTRAINT unique_request UNIQUE (user_email, organization_id, role_name);
