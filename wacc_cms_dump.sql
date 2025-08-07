--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5 (Debian 17.5-1.pgdg120+1)
-- Dumped by pg_dump version 17.5 (Debian 17.5-1.pgdg120+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: wacc_user
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO wacc_user;

--
-- Name: accounts; Type: TABLE; Schema: public; Owner: wacc_user
--

CREATE TABLE public.accounts (
    id text NOT NULL,
    user_id text NOT NULL,
    type text NOT NULL,
    provider text NOT NULL,
    provider_account_id text NOT NULL,
    refresh_token text,
    access_token text,
    expires_at integer,
    token_type text,
    scope text,
    id_token text,
    session_state text
);


ALTER TABLE public.accounts OWNER TO wacc_user;

--
-- Name: booking_availability; Type: TABLE; Schema: public; Owner: wacc_user
--

CREATE TABLE public.booking_availability (
    id integer NOT NULL,
    facility_id integer NOT NULL,
    day_of_week integer NOT NULL,
    start_time text NOT NULL,
    end_time text NOT NULL,
    is_available boolean DEFAULT true NOT NULL
);


ALTER TABLE public.booking_availability OWNER TO wacc_user;

--
-- Name: booking_availability_id_seq; Type: SEQUENCE; Schema: public; Owner: wacc_user
--

CREATE SEQUENCE public.booking_availability_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.booking_availability_id_seq OWNER TO wacc_user;

--
-- Name: booking_availability_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: wacc_user
--

ALTER SEQUENCE public.booking_availability_id_seq OWNED BY public.booking_availability.id;


--
-- Name: bookings; Type: TABLE; Schema: public; Owner: wacc_user
--

CREATE TABLE public.bookings (
    id integer NOT NULL,
    facility_id integer NOT NULL,
    customer_name text NOT NULL,
    customer_email text NOT NULL,
    customer_phone text,
    event_title text NOT NULL,
    event_description text,
    start_date_time timestamp(3) without time zone NOT NULL,
    end_date_time timestamp(3) without time zone NOT NULL,
    total_hours numeric(4,2) NOT NULL,
    hourly_rate numeric(8,2),
    total_cost numeric(10,2),
    status text DEFAULT 'pending'::text NOT NULL,
    notes text,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.bookings OWNER TO wacc_user;

--
-- Name: bookings_id_seq; Type: SEQUENCE; Schema: public; Owner: wacc_user
--

CREATE SEQUENCE public.bookings_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.bookings_id_seq OWNER TO wacc_user;

--
-- Name: bookings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: wacc_user
--

ALTER SEQUENCE public.bookings_id_seq OWNED BY public.bookings.id;


--
-- Name: community_groups; Type: TABLE; Schema: public; Owner: wacc_user
--

CREATE TABLE public.community_groups (
    id integer NOT NULL,
    title text NOT NULL,
    description text,
    active boolean DEFAULT true NOT NULL
);


ALTER TABLE public.community_groups OWNER TO wacc_user;

--
-- Name: community_groups_id_seq; Type: SEQUENCE; Schema: public; Owner: wacc_user
--

CREATE SEQUENCE public.community_groups_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.community_groups_id_seq OWNER TO wacc_user;

--
-- Name: community_groups_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: wacc_user
--

ALTER SEQUENCE public.community_groups_id_seq OWNED BY public.community_groups.id;


--
-- Name: contact_info; Type: TABLE; Schema: public; Owner: wacc_user
--



CREATE TABLE public.contact_info (
    id integer NOT NULL,
    type text NOT NULL,
    label text,
    value text NOT NULL,
    description text,
    display_order integer DEFAULT 0 NOT NULL,
    active boolean DEFAULT true NOT NULL
);


ALTER TABLE public.contact_info OWNER TO wacc_user;

--
-- Name: contact_info_id_seq; Type: SEQUENCE; Schema: public; Owner: wacc_user
--

CREATE SEQUENCE public.contact_info_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.contact_info_id_seq OWNER TO wacc_user;

--
-- Name: contact_info_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: wacc_user
--

ALTER SEQUENCE public.contact_info_id_seq OWNED BY public.contact_info.id;


--
-- Name: facilities; Type: TABLE; Schema: public; Owner: wacc_user
--

CREATE TABLE public.facilities (
    id integer NOT NULL,
    name text NOT NULL,
    subtitle text,
    description text,
    capacity integer,
    dimensions text,
    hourly_rate numeric(8,2),
    features jsonb,
    image_url text,
    active boolean DEFAULT true NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.facilities OWNER TO wacc_user;

--
-- Name: facilities_id_seq; Type: SEQUENCE; Schema: public; Owner: wacc_user
--

CREATE SEQUENCE public.facilities_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.facilities_id_seq OWNER TO wacc_user;

--
-- Name: facilities_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: wacc_user
--

ALTER SEQUENCE public.facilities_id_seq OWNED BY public.facilities.id;


--
-- Name: facility_services; Type: TABLE; Schema: public; Owner: wacc_user
--

CREATE TABLE public.facility_services (
    id integer NOT NULL,
    name text NOT NULL,
    description text,
    features jsonb,
    pricing_info text,
    category text,
    active boolean DEFAULT true NOT NULL
);


ALTER TABLE public.facility_services OWNER TO wacc_user;

--
-- Name: facility_services_id_seq; Type: SEQUENCE; Schema: public; Owner: wacc_user
--

CREATE SEQUENCE public.facility_services_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.facility_services_id_seq OWNER TO wacc_user;

--
-- Name: facility_services_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: wacc_user
--

ALTER SEQUENCE public.facility_services_id_seq OWNED BY public.facility_services.id;


--
-- Name: faq_items; Type: TABLE; Schema: public; Owner: wacc_user
--

CREATE TABLE public.faq_items (
    id integer NOT NULL,
    question text NOT NULL,
    answer text NOT NULL,
    category text,
    image_url text,
    display_order integer DEFAULT 0 NOT NULL,
    active boolean DEFAULT true NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.faq_items OWNER TO wacc_user;

--
-- Name: faq_items_id_seq; Type: SEQUENCE; Schema: public; Owner: wacc_user
--

CREATE SEQUENCE public.faq_items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.faq_items_id_seq OWNER TO wacc_user;

--
-- Name: faq_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: wacc_user
--

ALTER SEQUENCE public.faq_items_id_seq OWNED BY public.faq_items.id;


--
-- Name: media_library; Type: TABLE; Schema: public; Owner: wacc_user
--

CREATE TABLE public.media_library (
    id integer NOT NULL,
    filename text NOT NULL,
    original_name text NOT NULL,
    file_path text NOT NULL,
    file_type text NOT NULL,
    file_size integer,
    alt_text text,
    caption text,
    uploaded_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.media_library OWNER TO wacc_user;

--
-- Name: media_library_id_seq; Type: SEQUENCE; Schema: public; Owner: wacc_user
--

CREATE SEQUENCE public.media_library_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.media_library_id_seq OWNER TO wacc_user;

--
-- Name: media_library_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: wacc_user
--

ALTER SEQUENCE public.media_library_id_seq OWNED BY public.media_library.id;


--
-- Name: opening_hours; Type: TABLE; Schema: public; Owner: wacc_user
--

CREATE TABLE public.opening_hours (
    id integer NOT NULL,
    title text NOT NULL,
    schedule jsonb NOT NULL,
    description text,
    type text NOT NULL,
    active boolean DEFAULT true NOT NULL
);


ALTER TABLE public.opening_hours OWNER TO wacc_user;

--
-- Name: opening_hours_id_seq; Type: SEQUENCE; Schema: public; Owner: wacc_user
--

CREATE SEQUENCE public.opening_hours_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.opening_hours_id_seq OWNER TO wacc_user;

--
-- Name: opening_hours_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: wacc_user
--

ALTER SEQUENCE public.opening_hours_id_seq OWNED BY public.opening_hours.id;


--
-- Name: program_schedules; Type: TABLE; Schema: public; Owner: wacc_user
--

CREATE TABLE public.program_schedules (
    id integer NOT NULL,
    program_id integer NOT NULL,
    day_of_week text,
    start_time text,
    end_time text,
    description text,
    active boolean DEFAULT true NOT NULL
);


ALTER TABLE public.program_schedules OWNER TO wacc_user;

--
-- Name: program_schedules_id_seq; Type: SEQUENCE; Schema: public; Owner: wacc_user
--

CREATE SEQUENCE public.program_schedules_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.program_schedules_id_seq OWNER TO wacc_user;

--
-- Name: program_schedules_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: wacc_user
--

ALTER SEQUENCE public.program_schedules_id_seq OWNED BY public.program_schedules.id;


--
-- Name: programs; Type: TABLE; Schema: public; Owner: wacc_user
--

CREATE TABLE public.programs (
    id integer NOT NULL,
    title text NOT NULL,
    description text,
    category text NOT NULL,
    age_group text,
    price text,
    booking_info text,
    instructor text,
    contact_email text,
    contact_phone text,
    contact_website text,
    image_url text,
    active boolean DEFAULT true NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.programs OWNER TO wacc_user;

--
-- Name: programs_id_seq; Type: SEQUENCE; Schema: public; Owner: wacc_user
--

CREATE SEQUENCE public.programs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.programs_id_seq OWNER TO wacc_user;

--
-- Name: programs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: wacc_user
--

ALTER SEQUENCE public.programs_id_seq OWNED BY public.programs.id;


--
-- Name: sessions; Type: TABLE; Schema: public; Owner: wacc_user
--

CREATE TABLE public.sessions (
    id text NOT NULL,
    session_token text NOT NULL,
    user_id text NOT NULL,
    expires timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.sessions OWNER TO wacc_user;

--
-- Name: site_settings; Type: TABLE; Schema: public; Owner: wacc_user
--

CREATE TABLE public.site_settings (
    id integer NOT NULL,
    key text NOT NULL,
    value text,
    type text NOT NULL,
    description text,
    updated_at timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.site_settings OWNER TO wacc_user;

--
-- Name: site_settings_id_seq; Type: SEQUENCE; Schema: public; Owner: wacc_user
--

CREATE SEQUENCE public.site_settings_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.site_settings_id_seq OWNER TO wacc_user;

--
-- Name: site_settings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: wacc_user
--

ALTER SEQUENCE public.site_settings_id_seq OWNED BY public.site_settings.id;


--
-- Name: testimonials; Type: TABLE; Schema: public; Owner: wacc_user
--

CREATE TABLE public.testimonials (
    id integer NOT NULL,
    quote text NOT NULL,
    author_name text NOT NULL,
    author_title text,
    avatar_url text,
    active boolean DEFAULT true NOT NULL,
    display_order integer DEFAULT 0 NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.testimonials OWNER TO wacc_user;

--
-- Name: testimonials_id_seq; Type: SEQUENCE; Schema: public; Owner: wacc_user
--

CREATE SEQUENCE public.testimonials_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.testimonials_id_seq OWNER TO wacc_user;

--
-- Name: testimonials_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: wacc_user
--

ALTER SEQUENCE public.testimonials_id_seq OWNED BY public.testimonials.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: wacc_user
--

CREATE TABLE public.users (
    id text NOT NULL,
    name text,
    email text NOT NULL,
    email_verified timestamp(3) without time zone,
    image text,
    password text,
    role text DEFAULT 'admin'::text NOT NULL,
    active boolean DEFAULT true NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.users OWNER TO wacc_user;

--
-- Name: verificationtokens; Type: TABLE; Schema: public; Owner: wacc_user
--

CREATE TABLE public.verificationtokens (
    identifier text NOT NULL,
    token text NOT NULL,
    expires timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.verificationtokens OWNER TO wacc_user;

--
-- Name: booking_availability id; Type: DEFAULT; Schema: public; Owner: wacc_user
--

ALTER TABLE ONLY public.booking_availability ALTER COLUMN id SET DEFAULT nextval('public.booking_availability_id_seq'::regclass);


--
-- Name: bookings id; Type: DEFAULT; Schema: public; Owner: wacc_user
--

ALTER TABLE ONLY public.bookings ALTER COLUMN id SET DEFAULT nextval('public.bookings_id_seq'::regclass);


--
-- Name: community_groups id; Type: DEFAULT; Schema: public; Owner: wacc_user
--

ALTER TABLE ONLY public.community_groups ALTER COLUMN id SET DEFAULT nextval('public.community_groups_id_seq'::regclass);


--
-- Name: contact_info id; Type: DEFAULT; Schema: public; Owner: wacc_user
--

ALTER TABLE ONLY public.contact_info ALTER COLUMN id SET DEFAULT nextval('public.contact_info_id_seq'::regclass);


--
-- Name: facilities id; Type: DEFAULT; Schema: public; Owner: wacc_user
--

ALTER TABLE ONLY public.facilities ALTER COLUMN id SET DEFAULT nextval('public.facilities_id_seq'::regclass);


--
-- Name: facility_services id; Type: DEFAULT; Schema: public; Owner: wacc_user
--

ALTER TABLE ONLY public.facility_services ALTER COLUMN id SET DEFAULT nextval('public.facility_services_id_seq'::regclass);


--
-- Name: faq_items id; Type: DEFAULT; Schema: public; Owner: wacc_user
--

ALTER TABLE ONLY public.faq_items ALTER COLUMN id SET DEFAULT nextval('public.faq_items_id_seq'::regclass);


--
-- Name: media_library id; Type: DEFAULT; Schema: public; Owner: wacc_user
--

ALTER TABLE ONLY public.media_library ALTER COLUMN id SET DEFAULT nextval('public.media_library_id_seq'::regclass);


--
-- Name: opening_hours id; Type: DEFAULT; Schema: public; Owner: wacc_user
--

ALTER TABLE ONLY public.opening_hours ALTER COLUMN id SET DEFAULT nextval('public.opening_hours_id_seq'::regclass);


--
-- Name: program_schedules id; Type: DEFAULT; Schema: public; Owner: wacc_user
--

ALTER TABLE ONLY public.program_schedules ALTER COLUMN id SET DEFAULT nextval('public.program_schedules_id_seq'::regclass);


--
-- Name: programs id; Type: DEFAULT; Schema: public; Owner: wacc_user
--

ALTER TABLE ONLY public.programs ALTER COLUMN id SET DEFAULT nextval('public.programs_id_seq'::regclass);


--
-- Name: site_settings id; Type: DEFAULT; Schema: public; Owner: wacc_user
--

ALTER TABLE ONLY public.site_settings ALTER COLUMN id SET DEFAULT nextval('public.site_settings_id_seq'::regclass);


--
-- Name: testimonials id; Type: DEFAULT; Schema: public; Owner: wacc_user
--

ALTER TABLE ONLY public.testimonials ALTER COLUMN id SET DEFAULT nextval('public.testimonials_id_seq'::regclass);


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: wacc_user
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
b007c17b-dfb1-4a7f-8e7d-120050b03f91	966a6b432adab13da53e64c5234c782d356dc1ade32444f052b0fa80eee9de7d	2025-08-02 22:04:52.688815+00	20250802220452_init	\N	\N	2025-08-02 22:04:52.551361+00	1
\.


--
-- Data for Name: accounts; Type: TABLE DATA; Schema: public; Owner: wacc_user
--

COPY public.accounts (id, user_id, type, provider, provider_account_id, refresh_token, access_token, expires_at, token_type, scope, id_token, session_state) FROM stdin;
\.


--
-- Data for Name: booking_availability; Type: TABLE DATA; Schema: public; Owner: wacc_user
--

COPY public.booking_availability (id, facility_id, day_of_week, start_time, end_time, is_available) FROM stdin;
\.


--
-- Data for Name: bookings; Type: TABLE DATA; Schema: public; Owner: wacc_user
--

COPY public.bookings (id, facility_id, customer_name, customer_email, customer_phone, event_title, event_description, start_date_time, end_date_time, total_hours, hourly_rate, total_cost, status, notes, created_at, updated_at) FROM stdin;
1	1	Thi	dakthi9@gmail.com	07704 996246	Community Meeting	Expected guests: 2	2025-08-25 07:00:00	2025-08-25 08:00:00	1.00	50.00	50.00	pending	Submitted via website booking form	2025-08-04 08:40:54.69	2025-08-04 08:40:54.688
2	2	Thi	dakthi9@gmail.com	07704 996246	Birthday Party	Expected guests: 2	2025-09-24 06:00:00	2025-09-24 07:00:00	1.00	20.00	20.00	pending	Submitted via website booking form	2025-08-04 08:59:26.372	2025-08-04 08:59:26.366
3	2	Thi	dakthi9@gmail.com	07704 996246	Birthday Party	\N	2026-09-25 06:00:00	2026-09-25 07:00:00	1.00	20.00	20.00	pending	Expected Guests: 2	2025-08-04 10:24:24.925	2025-08-04 10:24:24.924
4	1	Thi Dac	dakthi9@gmail.com	07704996246	Birthday Party	\N	2025-09-25 06:00:00	2025-09-25 07:00:00	1.00	50.00	50.00	pending	Expected Guests: 2	2025-08-04 11:15:16.358	2025-08-04 11:15:16.357
5	2	Sushant Laxmynarayanan	swlondon@computerxplorers.co.uk	07979550384	Other	Dear Team,\n\nMy name is Sushant and I represent ComputerXplorers Southwest London, an organisation dedicated to providing engaging and educational coding workshops for children. We are interested in hosting a weekly coding club at your venue during the upcoming summer period and would like to inquire about the availability and cost of renting a suitable space.\n\nSpecifically, we are looking for:\n\nFrequency: Once a week during the summer months\n\nDuration: 1 Hour\n\nRoom Requirements: A space that can comfortably accommodate 10 children, with access to tables, chairs, and electrical outlets for laptops\n\nCould you please provide the following information:\n\nAvailability: Do you have a room that meets these requirements?\nPricing: What would be the cost of renting the space for each session? Are there any discounts available for educational or community-focused programmes?\n\nFacilities: Are there any additional facilities or equipment included in the rental fee?\n\nBooking Process: What is the procedure for booking the space, and are there any forms or documentation we need to complete?\n\nWe believe that hosting our coding club at West Acton Community Centre would be a great opportunity to engage local children in valuable STEM learning experiences. We are committed to ensuring a safe and enriching environment for all participants.	2025-08-18 13:00:00	2025-08-18 14:00:00	1.00	20.00	20.00	pending	Description: Dear Team,\n\nMy name is Sushant and I represent ComputerXplorers Southwest London, an organisation dedicated to providing engaging and educational coding workshops for children. We are interested in hosting a weekly coding club at your venue during the upcoming summer period and would like to inquire about the availability and cost of renting a suitable space.\n\nSpecifically, we are looking for:\n\nFrequency: Once a week during the summer months\n\nDuration: 1 Hour\n\nRoom Requirements: A space that can comfortably accommodate 10 children, with access to tables, chairs, and electrical outlets for laptops\n\nCould you please provide the following information:\n\nAvailability: Do you have a room that meets these requirements?\nPricing: What would be the cost of renting the space for each session? Are there any discounts available for educational or community-focused programmes?\n\nFacilities: Are there any additional facilities or equipment included in the rental fee?\n\nBooking Process: What is the procedure for booking the space, and are there any forms or documentation we need to complete?\n\nWe believe that hosting our coding club at West Acton Community Centre would be a great opportunity to engage local children in valuable STEM learning experiences. We are committed to ensuring a safe and enriching environment for all participants.\nOrganization: Computer Xplorers\nExpected Guests: 10\nCatering: NA\nRegular Booking: Yes	2025-08-04 11:46:55.284	2025-08-04 11:46:55.282
\.


--
-- Data for Name: community_groups; Type: TABLE DATA; Schema: public; Owner: wacc_user
--

COPY public.community_groups (id, title, description, active) FROM stdin;
1	The Society of Afghan Residents	Cultural community group supporting Afghan families in West Acton	t
2	Arab Families Community Group	Supporting Arab families in the local community	t
\.


--
-- Data for Name: contact_info; Type: TABLE DATA; Schema: public; Owner: wacc_user
--

COPY public.contact_info (id, type, label, value, description, display_order, active) FROM stdin;
1	email	General Enquiries	info@westactoncentre.co.uk	For bookings, program information, and general questions	1	t
2	phone	Phone	020 8992 8899	Call during office hours for immediate assistance	2	t
3	email	Ealing Council	customers@ealing.gov.uk	For council-related enquiries and services	3	t
4	website	Website	www.westactoncentre.co.uk	Visit our main website for updates and information	4	t
\.


--
-- Data for Name: facilities; Type: TABLE DATA; Schema: public; Owner: wacc_user
--

COPY public.facilities (id, name, subtitle, description, capacity, dimensions, hourly_rate, features, image_url, active, created_at, updated_at) FROM stdin;
1	Main Hall	120 Person Capacity • 9.81m × 12.64m	Spacious hall with outside paved area access, perfect for large events, parties, weddings, funerals, NHS courses, and community gatherings.	120	9.81m × 12.64m	50.00	["120 person capacity", "Outside paved area access", "Kitchen facilities included", "10 large rectangular tables", "80 chairs included", "Professional cleaning included"]	/img/80-chairs.jpeg	t	2025-08-04 08:18:01.719	2025-08-04 08:18:01.719
2	Small Hall	15 Person Capacity • 4.26m × 6.20m	Intimate space ideal for small group classes, meetings, workshops, and community group gatherings.	15	4.26m × 6.20m	20.00	["15 person capacity", "Perfect for workshops", "Small group meetings", "Regular class sessions", "Comfortable environment"]	/img/manager-office.jpeg	t	2025-08-04 08:18:01.753	2025-08-04 08:18:01.753
\.


--
-- Data for Name: facility_services; Type: TABLE DATA; Schema: public; Owner: wacc_user
--

COPY public.facility_services (id, name, description, features, pricing_info, category, active) FROM stdin;
1	Kitchen Access	Full kitchen facilities with sink, power outlets for kettle, and small seating area. Outside catering welcome.	["Sink and counter space", "Power outlets for appliances", "Small seating area", "Refrigeration available", "No cooking allowed - catering friendly"]	\N	Additional Services	t
2	Tables & Chairs	Quality furniture included with hall rentals at no additional cost.	["10 large rectangular tables (Main Hall)", "80 chairs (Main Hall)", "Professional setup available", "Included in hire price"]	\N	Additional Services	t
\.


--
-- Data for Name: faq_items; Type: TABLE DATA; Schema: public; Owner: wacc_user
--

COPY public.faq_items (id, question, answer, category, image_url, display_order, active, created_at) FROM stdin;
1	How do I book a room at WACC?	You can book rooms through our website contact form. Please contact us for current pricing.	Booking	\N	1	t	2025-08-04 08:18:02.094
2	What are your opening hours?	The centre is open Monday to Sunday from 7:00 AM to 11:00 PM.	General	\N	2	t	2025-08-04 08:18:02.094
3	Do I need to book for Stay & Play sessions?	No booking required! Just come along on Monday, Wednesday, or Friday from 10:00-11:45 AM. Sessions cost £4 for members, £1 for siblings.	Programs	\N	3	t	2025-08-04 08:18:02.094
4	Is parking available?	Yes, we have onsite parking available for visitors and event attendees.	General	\N	4	t	2025-08-04 08:18:02.094
\.


--
-- Data for Name: media_library; Type: TABLE DATA; Schema: public; Owner: wacc_user
--

COPY public.media_library (id, filename, original_name, file_path, file_type, file_size, alt_text, caption, uploaded_at) FROM stdin;
\.


--
-- Data for Name: opening_hours; Type: TABLE DATA; Schema: public; Owner: wacc_user
--

COPY public.opening_hours (id, title, schedule, description, type, active) FROM stdin;
1	Centre Opening Hours	["Monday - Sunday: 7:00 AM - 11:00 PM"]	The centre is open 7 days a week for programs and events	centre	t
2	Office Hours	["Monday: 9:30 AM - 11:00 AM", "Wednesday - Friday: 10:00 AM - 2:30 PM"]	Best times to reach us by phone for immediate assistance	office	t
\.


--
-- Data for Name: program_schedules; Type: TABLE DATA; Schema: public; Owner: wacc_user
--

COPY public.program_schedules (id, program_id, day_of_week, start_time, end_time, description, active) FROM stdin;
2	3	Monday	10:00	11:45	Monday: 10:00 AM - 11:45 AM	t
3	3	Wednesday	10:00	11:45	Wednesday: 10:00 AM - 11:45 AM	t
4	3	Friday	10:00	11:45	Friday: 10:00 AM - 11:45 AM	t
5	4	Wednesday	17:00	19:00	Children (Ages 4-13): Wednesday: 5:00 PM - 7:00 PM	t
6	4	Sunday	10:00	11:30	Children (Ages 4-13): Sunday: 10:00 AM - 11:30 AM	t
7	4	Friday	18:30	20:30	Adults (Ages 14+): Friday: 6:30 PM - 8:30 PM	t
8	4	Sunday	11:30	14:00	Adults (Ages 14+): Sunday: 11:30 AM - 2:00 PM (Technical)	t
9	4	Sunday	13:30	15:00	Adults (Ages 14+): Sunday: 1:30 PM - 3:00 PM (Sparring)	t
10	5	Tuesday	19:30	21:00	Tuesday: 7:30 PM - 9:00 PM	t
11	6	Tuesday	15:00	18:00	Tuesday: 3:00 PM - 6:00 PM	t
12	6	Saturday	10:00	13:00	Saturday: 10:00 AM - 1:00 PM	t
13	7	\N	\N	\N	Contact for current schedule	t
14	8	Tuesday	10:00	11:00	Tuesday: 10:00 AM - 11:00 AM	t
15	8	Tuesday	18:15	19:15	Tuesday: 6:15 PM - 7:15 PM	t
\.


--
-- Data for Name: programs; Type: TABLE DATA; Schema: public; Owner: wacc_user
--

COPY public.programs (id, title, description, category, age_group, price, booking_info, instructor, contact_email, contact_phone, contact_website, image_url, active, created_at, updated_at) FROM stdin;
3	West Acton Stay & Play	Drop-in session run by professionals with toys, arts & crafts, painting, cars & tractors, and soft play in our spacious hall.	early-years	Young children & parents	Members £4.00 per session, siblings £1.00	No booking required - just come along!	\N	\N	\N	\N	/img/poster-stayandplay.jpeg	t	2025-08-04 08:18:00.85	2025-08-04 08:18:00.85
4	West Acton Taekwondo	Traditional martial arts training for children and adults, building discipline, fitness, and confidence.	martial-arts	Ages 4+	\N	\N	\N	\N	\N	\N	/img/poster-taekwondo.jpeg	t	2025-08-04 08:18:01.008	2025-08-04 08:18:01.008
5	Fitness Exercise Club - Lau Gar Kung Fu	Traditional Shaolin-based martial art with structured training methods focusing on fitness and technique.	martial-arts	Adults	\N	\N	\N	b.k.f.f@hotmail.co.uk	07572 718 870	\N	/img/poster-kungfu.jpeg	t	2025-08-04 08:18:01.188	2025-08-04 08:18:01.188
6	Kumon Maths & English (and Kokugo - Japanese)	Educational support in English, Maths, and Japanese language with local tutor Teruko Mori.	education	Children & young people	\N	\N	Teruko Mori	actonwest@kumoncentre.co.uk	\N	www.kumon.co.uk/Acton-West	/img/poster-kumon.jpeg	t	2025-08-04 08:18:01.355	2025-08-04 08:18:01.355
7	Ealing Judo Club	Promotes fitness, confidence, friendship, and fun through judo training for all skill levels.	martial-arts	All ages	\N	\N	\N	EalingJudoClub@hotmail.com	\N	www.ealingjudoclub.com	/img/IMG_1290.jpeg	t	2025-08-04 08:18:01.475	2025-08-04 08:18:01.475
8	Zumba with Anae	High-energy dance fitness classes combining fun choreography with great music.	fitness	Adults	\N	Book at anae-fitness.com	Anae	\N	\N	anae-fitness.com	/img/poster-zumba.jpeg	t	2025-08-04 08:18:01.612	2025-08-04 08:18:01.612
\.


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: wacc_user
--

COPY public.sessions (id, session_token, user_id, expires) FROM stdin;
\.


--
-- Data for Name: site_settings; Type: TABLE DATA; Schema: public; Owner: wacc_user
--

COPY public.site_settings (id, key, value, type, description, updated_at) FROM stdin;
239	site_title	West Acton Community Centre	text	Main site title	2025-08-04 08:18:02.222
240	community_residents	3000	number	Number of residents served	2025-08-04 08:18:02.222
241	weekly_programs	15	number	Number of regular programs per week	2025-08-04 08:18:02.222
242	main_hall_capacity	120	number	Maximum capacity in Main Hall	2025-08-04 08:18:02.222
\.


--
-- Data for Name: testimonials; Type: TABLE DATA; Schema: public; Owner: wacc_user
--

COPY public.testimonials (id, quote, author_name, author_title, avatar_url, active, display_order, created_at) FROM stdin;
1	WACC has been such a blessing for our family. The Stay & Play sessions give our toddler a chance to socialize while I connect with other parents in the community.	Sarah Johnson	Parent, West Acton resident	/img/user-1.png	t	1	2025-08-04 08:18:02.006
2	I've been attending Taekwondo classes here for 3 years. The instructors are excellent and the community spirit is amazing. It's not just exercise - it's a second home.	David Chen	Taekwondo student	/img/user-1.png	t	2	2025-08-04 08:18:02.006
3	We recently held our community fundraiser here and the staff were incredibly helpful. The Main Hall was perfect for our event and the kitchen facilities made catering so much easier.	Amira Hassan	Community organizer	/img/user-1.png	t	3	2025-08-04 08:18:02.006
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: wacc_user
--

COPY public.users (id, name, email, email_verified, image, password, role, active, created_at, updated_at) FROM stdin;
cmdut14wv0000lp40sytv2g58	WACC Admin	admin@westactoncentre.co.uk	\N	\N	$2b$12$qFA0haAiFiKIio5LySBxBejLdM70QefeqOhNpmTpKfaGbZodZzCxy	admin	t	2025-08-02 22:08:47.647	2025-08-02 22:08:47.647
\.


--
-- Data for Name: verificationtokens; Type: TABLE DATA; Schema: public; Owner: wacc_user
--

COPY public.verificationtokens (identifier, token, expires) FROM stdin;
\.


--
-- Name: booking_availability_id_seq; Type: SEQUENCE SET; Schema: public; Owner: wacc_user
--

SELECT pg_catalog.setval('public.booking_availability_id_seq', 1, false);


--
-- Name: bookings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: wacc_user
--

SELECT pg_catalog.setval('public.bookings_id_seq', 5, true);


--
-- Name: community_groups_id_seq; Type: SEQUENCE SET; Schema: public; Owner: wacc_user
--

SELECT pg_catalog.setval('public.community_groups_id_seq', 2, true);


--
-- Name: contact_info_id_seq; Type: SEQUENCE SET; Schema: public; Owner: wacc_user
--

SELECT pg_catalog.setval('public.contact_info_id_seq', 4, true);


--
-- Name: facilities_id_seq; Type: SEQUENCE SET; Schema: public; Owner: wacc_user
--

SELECT pg_catalog.setval('public.facilities_id_seq', 2, true);


--
-- Name: facility_services_id_seq; Type: SEQUENCE SET; Schema: public; Owner: wacc_user
--

SELECT pg_catalog.setval('public.facility_services_id_seq', 2, true);


--
-- Name: faq_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: wacc_user
--

SELECT pg_catalog.setval('public.faq_items_id_seq', 4, true);


--
-- Name: media_library_id_seq; Type: SEQUENCE SET; Schema: public; Owner: wacc_user
--

SELECT pg_catalog.setval('public.media_library_id_seq', 1, false);


--
-- Name: opening_hours_id_seq; Type: SEQUENCE SET; Schema: public; Owner: wacc_user
--

SELECT pg_catalog.setval('public.opening_hours_id_seq', 2, true);


--
-- Name: program_schedules_id_seq; Type: SEQUENCE SET; Schema: public; Owner: wacc_user
--

SELECT pg_catalog.setval('public.program_schedules_id_seq', 15, true);


--
-- Name: programs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: wacc_user
--

SELECT pg_catalog.setval('public.programs_id_seq', 8, true);


--
-- Name: site_settings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: wacc_user
--

SELECT pg_catalog.setval('public.site_settings_id_seq', 242, true);


--
-- Name: testimonials_id_seq; Type: SEQUENCE SET; Schema: public; Owner: wacc_user
--

SELECT pg_catalog.setval('public.testimonials_id_seq', 3, true);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: wacc_user
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: accounts accounts_pkey; Type: CONSTRAINT; Schema: public; Owner: wacc_user
--

ALTER TABLE ONLY public.accounts
    ADD CONSTRAINT accounts_pkey PRIMARY KEY (id);


--
-- Name: booking_availability booking_availability_pkey; Type: CONSTRAINT; Schema: public; Owner: wacc_user
--

ALTER TABLE ONLY public.booking_availability
    ADD CONSTRAINT booking_availability_pkey PRIMARY KEY (id);


--
-- Name: bookings bookings_pkey; Type: CONSTRAINT; Schema: public; Owner: wacc_user
--

ALTER TABLE ONLY public.bookings
    ADD CONSTRAINT bookings_pkey PRIMARY KEY (id);


--
-- Name: community_groups community_groups_pkey; Type: CONSTRAINT; Schema: public; Owner: wacc_user
--

ALTER TABLE ONLY public.community_groups
    ADD CONSTRAINT community_groups_pkey PRIMARY KEY (id);


--
-- Name: contact_info contact_info_pkey; Type: CONSTRAINT; Schema: public; Owner: wacc_user
--

ALTER TABLE ONLY public.contact_info
    ADD CONSTRAINT contact_info_pkey PRIMARY KEY (id);


--
-- Name: facilities facilities_pkey; Type: CONSTRAINT; Schema: public; Owner: wacc_user
--

ALTER TABLE ONLY public.facilities
    ADD CONSTRAINT facilities_pkey PRIMARY KEY (id);


--
-- Name: facility_services facility_services_pkey; Type: CONSTRAINT; Schema: public; Owner: wacc_user
--

ALTER TABLE ONLY public.facility_services
    ADD CONSTRAINT facility_services_pkey PRIMARY KEY (id);


--
-- Name: faq_items faq_items_pkey; Type: CONSTRAINT; Schema: public; Owner: wacc_user
--

ALTER TABLE ONLY public.faq_items
    ADD CONSTRAINT faq_items_pkey PRIMARY KEY (id);


--
-- Name: media_library media_library_pkey; Type: CONSTRAINT; Schema: public; Owner: wacc_user
--

ALTER TABLE ONLY public.media_library
    ADD CONSTRAINT media_library_pkey PRIMARY KEY (id);


--
-- Name: opening_hours opening_hours_pkey; Type: CONSTRAINT; Schema: public; Owner: wacc_user
--

ALTER TABLE ONLY public.opening_hours
    ADD CONSTRAINT opening_hours_pkey PRIMARY KEY (id);


--
-- Name: program_schedules program_schedules_pkey; Type: CONSTRAINT; Schema: public; Owner: wacc_user
--

ALTER TABLE ONLY public.program_schedules
    ADD CONSTRAINT program_schedules_pkey PRIMARY KEY (id);


--
-- Name: programs programs_pkey; Type: CONSTRAINT; Schema: public; Owner: wacc_user
--

ALTER TABLE ONLY public.programs
    ADD CONSTRAINT programs_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: wacc_user
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: site_settings site_settings_pkey; Type: CONSTRAINT; Schema: public; Owner: wacc_user
--

ALTER TABLE ONLY public.site_settings
    ADD CONSTRAINT site_settings_pkey PRIMARY KEY (id);


--
-- Name: testimonials testimonials_pkey; Type: CONSTRAINT; Schema: public; Owner: wacc_user
--

ALTER TABLE ONLY public.testimonials
    ADD CONSTRAINT testimonials_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: wacc_user
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: accounts_provider_provider_account_id_key; Type: INDEX; Schema: public; Owner: wacc_user
--

CREATE UNIQUE INDEX accounts_provider_provider_account_id_key ON public.accounts USING btree (provider, provider_account_id);


--
-- Name: booking_availability_facility_id_day_of_week_key; Type: INDEX; Schema: public; Owner: wacc_user
--

CREATE UNIQUE INDEX booking_availability_facility_id_day_of_week_key ON public.booking_availability USING btree (facility_id, day_of_week);


--
-- Name: sessions_session_token_key; Type: INDEX; Schema: public; Owner: wacc_user
--

CREATE UNIQUE INDEX sessions_session_token_key ON public.sessions USING btree (session_token);


--
-- Name: site_settings_key_key; Type: INDEX; Schema: public; Owner: wacc_user
--

CREATE UNIQUE INDEX site_settings_key_key ON public.site_settings USING btree (key);


--
-- Name: users_email_key; Type: INDEX; Schema: public; Owner: wacc_user
--

CREATE UNIQUE INDEX users_email_key ON public.users USING btree (email);


--
-- Name: verificationtokens_identifier_token_key; Type: INDEX; Schema: public; Owner: wacc_user
--

CREATE UNIQUE INDEX verificationtokens_identifier_token_key ON public.verificationtokens USING btree (identifier, token);


--
-- Name: accounts accounts_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: wacc_user
--

ALTER TABLE ONLY public.accounts
    ADD CONSTRAINT accounts_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: booking_availability booking_availability_facility_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: wacc_user
--

ALTER TABLE ONLY public.booking_availability
    ADD CONSTRAINT booking_availability_facility_id_fkey FOREIGN KEY (facility_id) REFERENCES public.facilities(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: bookings bookings_facility_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: wacc_user
--

ALTER TABLE ONLY public.bookings
    ADD CONSTRAINT bookings_facility_id_fkey FOREIGN KEY (facility_id) REFERENCES public.facilities(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: program_schedules program_schedules_program_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: wacc_user
--

ALTER TABLE ONLY public.program_schedules
    ADD CONSTRAINT program_schedules_program_id_fkey FOREIGN KEY (program_id) REFERENCES public.programs(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: sessions sessions_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: wacc_user
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

