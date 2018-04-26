CREATE TABLE "user"
(
  email                VARCHAR(255) PRIMARY KEY,
  firstName            TEXT,
  lastName             TEXT,
  superuser            BOOLEAN,
  created_at           timestamp default current_timestamp
);

CREATE TABLE role
(
  name                 VARCHAR(255) PRIMARY KEY
);

CREATE TABLE organization
(
  id                   UUID PRIMARY KEY,
  name_en              TEXT,
  name_fi              TEXT,
  name_sv              TEXT,
  description_en       TEXT,
  description_fi       TEXT,
  description_sv       TEXT,
  url                  TEXT
);

CREATE TABLE user_organization
(
  user_email           VARCHAR(255) NOT NULL REFERENCES "user",
  organization_id      UUID         NOT NULL REFERENCES organization,
  role_name            VARCHAR(255) NOT NULL REFERENCES role,
  PRIMARY KEY (user_email, organization_id, role_name)
);

CREATE TABLE request
(
  id                   SERIAL PRIMARY KEY,
  user_email           VARCHAR(255) NOT NULL REFERENCES "user",
  organization_id      UUID         NOT NULL REFERENCES organization,
  role_name            VARCHAR(255) NOT NULL REFERENCES role,
  sent                 BOOLEAN DEFAULT 'false',
  UNIQUE (user_email, organization_id, role_name)
);


INSERT INTO role (name) values ('ADMIN');
INSERT INTO role (name) values ('DATA_MODEL_EDITOR');
INSERT INTO role (name) values ('TERMINOLOGY_EDITOR');
INSERT INTO role (name) values ('CODE_LIST_EDITOR');
