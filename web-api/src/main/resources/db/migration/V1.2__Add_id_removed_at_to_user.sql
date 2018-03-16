CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
ALTER TABLE "user" ADD COLUMN removed_at timestamp default NULL;
ALTER TABLE "user" DROP CONSTRAINT user_pkey CASCADE;
ALTER TABLE "user" ADD COLUMN id UUID PRIMARY KEY DEFAULT uuid_generate_v4();