ALTER TABLE "user" ALTER COLUMN email DROP NOT NULL;
UPDATE "user" SET email=null where removed_at is not null;
ALTER TABLE "user" DROP CONSTRAINT IF EXISTS email_unique_constraint;
ALTER TABLE "user" ADD CONSTRAINT email_unique_constraint UNIQUE (email);