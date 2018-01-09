ALTER TABLE organization ADD CONSTRAINT unique_name_fi UNIQUE (name_fi);

insert into organization (id, name_en, name_fi, name_sv, description_en, description_fi, description_sv, url) values ('71837f4a-c503-4f3d-84dc-d645314528cf', 'YTI-XBRL', 'YTI-XBRL', 'YTI-XBRL', 'XBRL-team organization', 'XBRL-tiimin organisaatio', 'XBRL-team organisation', '') ON CONFLICT DO NOTHING;

insert into "user" (email, firstName, lastName, superuser) values ('harri.eronen@compile.fi', 'Harri', 'Eronen', true) ON CONFLICT DO NOTHING;
--insert into "user" (email, firstName, lastName, superuser) values ('petri.tenhunen@vrk.fi', 'Petri', 'Tenhunen', true) ON CONFLICT DO NOTHING;
--insert into "user" (email, firstName, lastName, superuser) values ('elina.koskentalo@tieke.fi', 'Elina', 'Koskentalo', true) ON CONFLICT DO NOTHING;

insert into "user_organization" (user_email, organization_id, role_name) values ('harri.eronen@compile.fi', '71837f4a-c503-4f3d-84dc-d645314528cf', 'ADMIN') ON CONFLICT DO NOTHING;
insert into "user_organization" (user_email, organization_id, role_name) values ('harri.eronen@compile.fi', '71837f4a-c503-4f3d-84dc-d645314528cf', 'CODE_LIST_EDITOR') ON CONFLICT DO NOTHING;
insert into "user_organization" (user_email, organization_id, role_name) values ('harri.eronen@compile.fi', '71837f4a-c503-4f3d-84dc-d645314528cf', 'DATA_MODEL_EDITOR') ON CONFLICT DO NOTHING;
insert into "user_organization" (user_email, organization_id, role_name) values ('harri.eronen@compile.fi', '71837f4a-c503-4f3d-84dc-d645314528cf', 'TERMINOLOGY_EDITOR') ON CONFLICT DO NOTHING;

--insert into "user_organization" (user_email, organization_id, role_name) values ('petri.tenhunen@vrk.fi', '71837f4a-c503-4f3d-84dc-d645314528cf', 'ADMIN') ON CONFLICT DO NOTHING;
--insert into "user_organization" (user_email, organization_id, role_name) values ('petri.tenhunen@vrk.fi', '71837f4a-c503-4f3d-84dc-d645314528cf', 'CODE_LIST_EDITOR') ON CONFLICT DO NOTHING;
--insert into "user_organization" (user_email, organization_id, role_name) values ('petri.tenhunen@vrk.fi', '71837f4a-c503-4f3d-84dc-d645314528cf', 'DATA_MODEL_EDITOR') ON CONFLICT DO NOTHING;
--insert into "user_organization" (user_email, organization_id, role_name) values ('petri.tenhunen@vrk.fi', '71837f4a-c503-4f3d-84dc-d645314528cf', 'TERMINOLOGY_EDITOR') ON CONFLICT DO NOTHING;

--insert into "user_organization" (user_email, organization_id, role_name) values ('elina.koskentalo@tieke.fi', '71837f4a-c503-4f3d-84dc-d645314528cf', 'ADMIN') ON CONFLICT DO NOTHING;
--insert into "user_organization" (user_email, organization_id, role_name) values ('elina.koskentalo@tieke.fi', '71837f4a-c503-4f3d-84dc-d645314528cf', 'CODE_LIST_EDITOR') ON CONFLICT DO NOTHING;
--insert into "user_organization" (user_email, organization_id, role_name) values ('elina.koskentalo@tieke.fi', '71837f4a-c503-4f3d-84dc-d645314528cf', 'DATA_MODEL_EDITOR') ON CONFLICT DO NOTHING;
--insert into "user_organization" (user_email, organization_id, role_name) values ('elina.koskentalo@tieke.fi', '71837f4a-c503-4f3d-84dc-d645314528cf', 'TERMINOLOGY_EDITOR') ON CONFLICT DO NOTHING;