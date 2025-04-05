-- database
CREATE DATABASE "Template-Database"
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'en-GB'
    LC_CTYPE = 'en-GB'
    LOCALE_PROVIDER = 'libc'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;



-- roles
CREATE TABLE IF NOT EXISTS public.roles
(
    id integer NOT NULL DEFAULT nextval('roles_id_seq'::regclass),
    code character varying(10) COLLATE pg_catalog."default" NOT NULL,
    name character varying(50) COLLATE pg_catalog."default",
    CONSTRAINT roles_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.roles
    OWNER to postgres;



-- countries
CREATE TABLE IF NOT EXISTS public.countries
(
    id integer NOT NULL DEFAULT nextval('countries_id_seq'::regclass),
    code character varying(3) COLLATE pg_catalog."default" NOT NULL,
    name character varying(100) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT countries_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.countries
    OWNER to postgres;



-- cities
CREATE TABLE IF NOT EXISTS public.cities
(
    id integer NOT NULL DEFAULT nextval('cities_id_seq'::regclass),
    code character varying(10) COLLATE pg_catalog."default" NOT NULL,
    name character varying(50) COLLATE pg_catalog."default" NOT NULL,
    country_id integer NOT NULL,
    CONSTRAINT cities_pkey PRIMARY KEY (id),
    CONSTRAINT fk_cities_countries FOREIGN KEY (country_id)
        REFERENCES public.countries (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.cities
    OWNER to postgres;



-- addresses
CREATE TABLE IF NOT EXISTS public.addresses
(
    id integer NOT NULL DEFAULT nextval('addresses_id_seq'::regclass),
    street character varying(255) COLLATE pg_catalog."default",
    city_id integer,
    details text COLLATE pg_catalog."default",
    CONSTRAINT addresses_pkey PRIMARY KEY (id),
    CONSTRAINT addresses_city_id_fkey FOREIGN KEY (city_id)
        REFERENCES public.cities (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.addresses
    OWNER to postgres;



-- users
CREATE TABLE IF NOT EXISTS public.users
(
    id integer NOT NULL DEFAULT nextval('users_id_seq1'::regclass),
    username character varying(255) COLLATE pg_catalog."default" NOT NULL,
    email character varying(100) COLLATE pg_catalog."default" NOT NULL,
    password character varying(255) COLLATE pg_catalog."default" NOT NULL,
    first_name character varying(100) COLLATE pg_catalog."default",
    last_name character varying(100) COLLATE pg_catalog."default",
    phone_number character varying(20) COLLATE pg_catalog."default",
    age integer,
    address_id integer,
    role_id integer NOT NULL,
    CONSTRAINT users_pkey1 PRIMARY KEY (id),
    CONSTRAINT users_email_key1 UNIQUE (email),
    CONSTRAINT users_phone_number_key UNIQUE (phone_number),
    CONSTRAINT users_username_key1 UNIQUE (username),
    CONSTRAINT fk_users_roles FOREIGN KEY (role_id)
        REFERENCES public.roles (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.users
    OWNER to postgres;



-- inserts
-- roles
insert into roles(code, name)
values ('ADM', 'Admin');
insert into roles(code, name)
values ('USR', 'User');

-- countries
insert into countries(code, name) 
values ('US', 'USA')
insert into countries(code, name) 
values ('CA', 'Canada')
insert into countries(code, name) 
values ('MX', 'Mexico')
insert into countries(code, name) 
values ('RO', 'Romania')

-- USA
INSERT INTO cities(code, name, country_id) VALUES
('NYC', 'New York', 1),
('LAX', 'Los Angeles', 1),
('CHI', 'Chicago', 1),
('HOU', 'Houston', 1),
('PHX', 'Phoenix', 1);

-- Canada
INSERT INTO cities(code, name, country_id) VALUES
('TOR', 'Toronto', 2),
('VAN', 'Vancouver', 2),
('MON', 'Montreal', 2),
('CAL', 'Calgary', 2),
('OTT', 'Ottawa', 2);

-- Mexico
INSERT INTO cities(code, name, country_id) VALUES
('MEX', 'Mexico City', 3),
('GDL', 'Guadalajara', 3),
('MTY', 'Monterrey', 3),
('PUE', 'Puebla', 3),
('TJU', 'Tijuana', 3);

-- Romania
INSERT INTO cities(code, name, country_id) VALUES
('B', 'Bucharest', 4),
('CJ', 'Cluj-Napoca', 4),
('TM', 'Timișoara', 4),
('IS', 'Iași', 4),
('BR', 'Brașov', 4);

