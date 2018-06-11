ALTER TABLE user_organization DROP CONSTRAINT user_organization_pkey;
ALTER TABLE user_organization ADD COLUMN user_id UUID REFERENCES "user";
UPDATE user_organization set user_id = (select id from "user" u where u.email = user_email);
ALTER TABLE user_organization DROP COLUMN user_email;
ALTER TABLE user_organization ALTER COLUMN user_id SET NOT NULL;
ALTER TABLE user_organization ADD PRIMARY KEY (user_id, organization_id, role_name);

ALTER TABLE request DROP CONSTRAINT request_user_email_organization_id_role_name_key;
ALTER TABLE request ADD COLUMN user_id UUID REFERENCES "user";
UPDATE request set user_id = (select id from "user" u where u.email = user_email);
ALTER TABLE request DROP COLUMN user_email;
ALTER TABLE request ALTER COLUMN user_id SET NOT NULL;
ALTER TABLE request ADD UNIQUE (user_id, organization_id, role_name);
