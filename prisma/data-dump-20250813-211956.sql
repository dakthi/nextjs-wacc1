--
-- PostgreSQL database dump
--

-- Dumped from database version 14.18 (Debian 14.18-1.pgdg120+1)
-- Dumped by pg_dump version 14.16 (Homebrew)

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

--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: wacc_user
--

INSERT INTO public._prisma_migrations VALUES ('0004f14f-d2db-4ba4-ad81-5a7bb37e25d6', '966a6b432adab13da53e64c5234c782d356dc1ade32444f052b0fa80eee9de7d', '2025-08-13 18:16:56.964655+00', '20250802220452_init', NULL, NULL, '2025-08-13 18:16:56.578524+00', 1);
INSERT INTO public._prisma_migrations VALUES ('6a8111b2-51b1-43cb-8a66-9e66d517ae6d', '9154197fd130910afabcc9aa1f4d73d59a7344c3d2c4dc2b98799b5af5d634e9', '2025-08-13 18:16:57.337504+00', '20250809162030_add_notes_and_homepage_content', NULL, NULL, '2025-08-13 18:16:57.052877+00', 1);
INSERT INTO public._prisma_migrations VALUES ('0291e972-1d9f-4c1f-b9d7-98fd5d3e2da8', '788decba2e4656404932f9b8c693577fc586d4b59c45bd7b05d0d6c9100bd805', '2025-08-13 18:17:58.519804+00', '20250813181758_add_missing_columns', NULL, NULL, '2025-08-13 18:17:58.324842+00', 1);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: wacc_user
--

INSERT INTO public.users VALUES ('cmeabrmhm0000lplz6niw6796', 'Test Admin', 'test@admin.com', NULL, NULL, '$2b$12$9e84Kt9ePue/W6n7SPrgCuC6OaXFQZBkfn9ZO.yg6FNUlnfWqDc9m', 'admin', true, '2025-08-13 18:49:49.21', '2025-08-13 18:49:49.21');
INSERT INTO public.users VALUES ('cmeabtkv90000lp3hi13p14j2', 'WACC Admin', 'admin@westactoncentre.co.uk', NULL, NULL, '$2b$12$g3FPMeakjYv60.1UJaxmSezDhsTtzmyKiC40twiN.ATbcRM4OfuOu', 'admin', true, '2025-08-13 18:51:20.421', '2025-08-13 18:51:20.421');


--
-- Data for Name: accounts; Type: TABLE DATA; Schema: public; Owner: wacc_user
--



--
-- Data for Name: facilities; Type: TABLE DATA; Schema: public; Owner: wacc_user
--

INSERT INTO public.facilities VALUES (4, 'Small Room', '15 Person Capacity • 4.26m × 6.20m', 'Intimate space ideal for small group classes, meetings, workshops, and community group gatherings.', 15, '4.26m × 6.20m', 20.00, '["15 person capacity", "Perfect for workshops", "Small group meetings", "Regular class sessions", "Comfortable environment"]', 'https://bucket-wacc1.f47d23c072e7b2f871ecca11e36e0b25.r2.cloudflarestorage.com/uploads/1755111396111_ydbv6i_wacc-smallroom.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=1b6772892999957d50aede7703a8627e%2F20250813%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20250813T185636Z&X-Amz-Expires=604800&X-Amz-Signature=d72da293a5ab79366e40352135f418b7863d8dc5eb7a293b8e3d6853ac515c44&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject', true, '2025-08-13 18:18:06.877', '2025-08-13 18:56:37.098');
INSERT INTO public.facilities VALUES (3, 'Main Hall', '120 Person Capacity • 9.81m × 12.64m', 'Spacious hall with outside paved area access, perfect for large events, parties, weddings, NHS courses, and community gatherings.', 120, '9.81m × 12.64m', 50.00, '["120 person capacity", "Outside paved area access", "Kitchen facilities included", "10 large rectangular tables", "80 chairs included", "Professional cleaning included"]', 'https://bucket-wacc1.f47d23c072e7b2f871ecca11e36e0b25.r2.cloudflarestorage.com/uploads/1755111433144_atrenu_WhatsApp_Image_2025-08-05_at_18.19.13.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=1b6772892999957d50aede7703a8627e%2F20250813%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20250813T185713Z&X-Amz-Expires=604800&X-Amz-Signature=432af079d2700032e3e4a6d7373bf18027d81b46d0b8aff8de2a7f1cb50e22d2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject', true, '2025-08-13 18:18:06.808', '2025-08-13 20:01:18.227');


--
-- Data for Name: booking_availability; Type: TABLE DATA; Schema: public; Owner: wacc_user
--



--
-- Data for Name: bookings; Type: TABLE DATA; Schema: public; Owner: wacc_user
--



--
-- Data for Name: community_groups; Type: TABLE DATA; Schema: public; Owner: wacc_user
--

INSERT INTO public.community_groups VALUES (2, 'Arab Families Community Group', 'Supporting Arab families in the local community', true, NULL, 'Cultural & Social', NULL, NULL, NULL, '2025-08-13 18:18:07.486', 0, NULL, false, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-08-13 18:18:07.486', NULL);
INSERT INTO public.community_groups VALUES (1, 'The Society of Afghan Residents', 'Cultural community group supporting Afghan families in West Acton', true, '', 'Cultural & Social', '', '', '', '2025-08-13 18:18:07.486', 0, '', false, '', '', '', '', '', '', NULL, '', '2025-08-13 18:55:29.622', '');


--
-- Data for Name: contact_info; Type: TABLE DATA; Schema: public; Owner: wacc_user
--

INSERT INTO public.contact_info VALUES (5, 'email', 'General Enquiries', 'info@westactoncentre.co.uk', 'For bookings, program information, and general questions', 1, true);
INSERT INTO public.contact_info VALUES (6, 'phone', 'Phone', '020 8992 8899', 'Call during office hours for immediate assistance', 2, true);
INSERT INTO public.contact_info VALUES (7, 'email', 'Ealing Council', 'customers@ealing.gov.uk', 'For council-related enquiries and services', 3, true);
INSERT INTO public.contact_info VALUES (8, 'website', 'Website', 'www.westactoncentre.co.uk', 'Visit our main website for updates and information', 4, true);


--
-- Data for Name: facility_services; Type: TABLE DATA; Schema: public; Owner: wacc_user
--

INSERT INTO public.facility_services VALUES (3, 'Kitchen Access', 'Full kitchen facilities with sink, power outlets for kettle, and small seating area. Outside catering welcome.', '["Sink and counter space", "Power outlets for appliances", "Small seating area", "Refrigeration available", "No cooking allowed - catering friendly"]', NULL, 'Additional Services', true);
INSERT INTO public.facility_services VALUES (4, 'Tables & Chairs', 'Quality furniture included with hall rentals at no additional cost.', '["10 large rectangular tables (Main Hall)", "80 chairs (Main Hall)", "Professional setup available", "Included in hire price"]', NULL, 'Additional Services', true);


--
-- Data for Name: faq_items; Type: TABLE DATA; Schema: public; Owner: wacc_user
--

INSERT INTO public.faq_items VALUES (5, 'How do I book a room at WACC?', 'You can book rooms through our website contact form. Please contact us for current pricing.', 'Booking', NULL, 1, true, '2025-08-13 18:18:07.377');
INSERT INTO public.faq_items VALUES (6, 'What are your opening hours?', 'The centre is open Monday to Sunday from 7:00 AM to 11:00 PM.', 'General', NULL, 2, true, '2025-08-13 18:18:07.377');
INSERT INTO public.faq_items VALUES (7, 'Do I need to book for Stay & Play sessions?', 'No booking required! Just come along on Monday, Wednesday, or Friday from 10:00-11:45 AM. Sessions cost £4 for members, £1 for siblings.', 'Programs', NULL, 3, true, '2025-08-13 18:18:07.377');
INSERT INTO public.faq_items VALUES (8, 'Is parking available?', 'Yes, we have onsite parking available for visitors and event attendees.', 'General', NULL, 4, true, '2025-08-13 18:18:07.377');


--
-- Data for Name: media_library; Type: TABLE DATA; Schema: public; Owner: wacc_user
--

INSERT INTO public.media_library VALUES (1, 'uploads/1755109121422_cl1lqb_poster-fitness.jpeg', 'poster-fitness.jpeg', 'https://bucket-wacc1.f47d23c072e7b2f871ecca11e36e0b25.r2.cloudflarestorage.com/uploads/1755109121422_cl1lqb_poster-fitness.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=1b6772892999957d50aede7703a8627e%2F20250813%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20250813T181844Z&X-Amz-Expires=604800&X-Amz-Signature=ec9f393db135a8c033760d9a1afb003bf61a9041cdcd9b890a8f689a7dbc0ba5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject', 'image/jpeg', 4595544, 'Image: poster-fitness.jpeg', NULL, '2025-08-13 18:18:44.568', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.media_library VALUES (2, 'uploads/1755109227330_2lbrzt_poster-fitness.jpeg', 'poster-fitness.jpeg', 'https://bucket-wacc1.f47d23c072e7b2f871ecca11e36e0b25.r2.cloudflarestorage.com/uploads/1755109227330_2lbrzt_poster-fitness.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=1b6772892999957d50aede7703a8627e%2F20250813%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20250813T182030Z&X-Amz-Expires=604800&X-Amz-Signature=9ba068050bd11e0d7c3f41a8738618596f5813737eaf340500c4d8fee131c7cb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject', 'image/jpeg', 4595544, 'Image: poster-fitness.jpeg', NULL, '2025-08-13 18:20:30.838', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.media_library VALUES (3, 'uploads/1755110376378_h1j0cb_poster-fitness_Large.jpeg', 'poster-fitness Large.jpeg', 'https://bucket-wacc1.f47d23c072e7b2f871ecca11e36e0b25.r2.cloudflarestorage.com/uploads/1755110376378_h1j0cb_poster-fitness_Large.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=1b6772892999957d50aede7703a8627e%2F20250813%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20250813T183936Z&X-Amz-Expires=604800&X-Amz-Signature=80026693b40eb10bd45cbd942628a4292e1880e1a2b4717db369e98ceb7525fb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject', 'image/jpeg', 292923, 'Image: poster-fitness Large.jpeg', NULL, '2025-08-13 18:39:36.786', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.media_library VALUES (4, 'uploads/1755111112105_c9v4jt_outside-1.jpeg', 'outside-1.jpeg', 'https://bucket-wacc1.f47d23c072e7b2f871ecca11e36e0b25.r2.cloudflarestorage.com/uploads/1755111112105_c9v4jt_outside-1.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=1b6772892999957d50aede7703a8627e%2F20250813%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20250813T185152Z&X-Amz-Expires=604800&X-Amz-Signature=1ed631b2c64f7625a682bf33b3877b93986b6f1892dfbab14c7279dbbb379ce4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject', 'image/jpeg', 4544103, 'Image: outside-1.jpeg', NULL, '2025-08-13 18:51:52.795', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.media_library VALUES (5, 'uploads/1755111141901_3c8ri3_outside-1.jpeg', 'outside-1.jpeg', 'https://bucket-wacc1.f47d23c072e7b2f871ecca11e36e0b25.r2.cloudflarestorage.com/uploads/1755111141901_3c8ri3_outside-1.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=1b6772892999957d50aede7703a8627e%2F20250813%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20250813T185222Z&X-Amz-Expires=604800&X-Amz-Signature=ced8d4af8d73d113a47254230b9848d00924006413161aa6591fa2c4b3c7e85d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject', 'image/jpeg', 4544103, 'Image: outside-1.jpeg', NULL, '2025-08-13 18:52:22.594', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.media_library VALUES (6, 'uploads/1755111396111_ydbv6i_wacc-smallroom.jpeg', 'wacc-smallroom.jpeg', 'https://bucket-wacc1.f47d23c072e7b2f871ecca11e36e0b25.r2.cloudflarestorage.com/uploads/1755111396111_ydbv6i_wacc-smallroom.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=1b6772892999957d50aede7703a8627e%2F20250813%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20250813T185636Z&X-Amz-Expires=604800&X-Amz-Signature=d72da293a5ab79366e40352135f418b7863d8dc5eb7a293b8e3d6853ac515c44&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject', 'image/jpeg', 185405, 'Image: wacc-smallroom.jpeg', NULL, '2025-08-13 18:56:36.307', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.media_library VALUES (7, 'uploads/1755111433144_atrenu_WhatsApp_Image_2025-08-05_at_18.19.13.jpeg', 'WhatsApp Image 2025-08-05 at 18.19.13.jpeg', 'https://bucket-wacc1.f47d23c072e7b2f871ecca11e36e0b25.r2.cloudflarestorage.com/uploads/1755111433144_atrenu_WhatsApp_Image_2025-08-05_at_18.19.13.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=1b6772892999957d50aede7703a8627e%2F20250813%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20250813T185713Z&X-Amz-Expires=604800&X-Amz-Signature=432af079d2700032e3e4a6d7373bf18027d81b46d0b8aff8de2a7f1cb50e22d2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject', 'image/jpeg', 313253, 'Image: WhatsApp Image 2025-08-05 at 18.19.13.jpeg', NULL, '2025-08-13 18:57:13.338', NULL, NULL, NULL, NULL, NULL, NULL);


--
-- Data for Name: opening_hours; Type: TABLE DATA; Schema: public; Owner: wacc_user
--

INSERT INTO public.opening_hours VALUES (3, 'Centre Opening Hours', '["Monday - Sunday: 7:00 AM - 11:00 PM"]', 'The centre is open 7 days a week for programs and events', 'centre', true);
INSERT INTO public.opening_hours VALUES (4, 'Office Hours', '["Monday: 9:30 AM - 11:00 AM", "Wednesday - Friday: 10:00 AM - 2:30 PM"]', 'Best times to reach us by phone for immediate assistance', 'office', true);


--
-- Data for Name: programs; Type: TABLE DATA; Schema: public; Owner: wacc_user
--

INSERT INTO public.programs VALUES (7, 'West Acton Stay & Play', 'Drop-in session run by professionals with toys, arts & crafts, painting, cars & tractors, and soft play in our spacious hall.', 'early-years', 'Young children & parents', 'Members £4.00 per session, siblings £1.00', 'No booking required - just come along!', NULL, NULL, NULL, NULL, '/img/poster-stayandplay.jpeg', true, '2025-08-13 18:18:05.516', '2025-08-13 18:18:05.516');
INSERT INTO public.programs VALUES (8, 'West Acton Taekwondo', 'Traditional martial arts training for children and adults, building discipline, fitness, and confidence.', 'martial-arts', 'Ages 4+', NULL, NULL, NULL, NULL, NULL, NULL, '/img/poster-taekwondo.jpeg', true, '2025-08-13 18:18:05.76', '2025-08-13 18:18:05.76');
INSERT INTO public.programs VALUES (9, 'Fitness Exercise Club - Lau Gar Kung Fu', 'Traditional Shaolin-based martial art with structured training methods focusing on fitness and technique.', 'martial-arts', 'Adults', NULL, NULL, NULL, 'b.k.f.f@hotmail.co.uk', '07572 718 870', NULL, '/img/poster-kungfu.jpeg', true, '2025-08-13 18:18:05.99', '2025-08-13 18:18:05.99');
INSERT INTO public.programs VALUES (10, 'Kumon Maths & English (and Kokugo - Japanese)', 'Educational support in English, Maths, and Japanese language with local tutor Teruko Mori.', 'education', 'Children & young people', NULL, NULL, 'Teruko Mori', 'actonwest@kumoncentre.co.uk', NULL, 'www.kumon.co.uk/Acton-West', '/img/poster-kumon.jpeg', true, '2025-08-13 18:18:06.187', '2025-08-13 18:18:06.187');
INSERT INTO public.programs VALUES (12, 'Zumba with Anae', 'High-energy dance fitness classes combining fun choreography with great music.', 'fitness', 'Adults', NULL, 'Book at anae-fitness.com', 'Anae', NULL, NULL, 'anae-fitness.com', '/img/poster-zumba.jpeg', true, '2025-08-13 18:18:06.628', '2025-08-13 18:18:06.628');
INSERT INTO public.programs VALUES (11, 'Ealing Judo Club', 'Promotes fitness, confidence, friendship, and fun through judo training for all skill levels.', 'martial-arts', 'All ages', '', '', '', 'EalingJudoClub@hotmail.com', '', 'http://www.ealingjudoclub.com/', 'https://bucket-wacc1.f47d23c072e7b2f871ecca11e36e0b25.r2.cloudflarestorage.com/uploads/1755111112105_c9v4jt_outside-1.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=1b6772892999957d50aede7703a8627e%2F20250813%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20250813T185152Z&X-Amz-Expires=604800&X-Amz-Signature=1ed631b2c64f7625a682bf33b3877b93986b6f1892dfbab14c7279dbbb379ce4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject', true, '2025-08-13 18:18:06.425', '2025-08-13 18:52:05.702');


--
-- Data for Name: program_schedules; Type: TABLE DATA; Schema: public; Owner: wacc_user
--

INSERT INTO public.program_schedules VALUES (15, 7, 'Monday', '10:00', '11:45', 'Monday: 10:00 AM - 11:45 AM', true);
INSERT INTO public.program_schedules VALUES (16, 7, 'Wednesday', '10:00', '11:45', 'Wednesday: 10:00 AM - 11:45 AM', true);
INSERT INTO public.program_schedules VALUES (17, 7, 'Friday', '10:00', '11:45', 'Friday: 10:00 AM - 11:45 AM', true);
INSERT INTO public.program_schedules VALUES (18, 8, 'Wednesday', '17:00', '19:00', 'Children (Ages 4-13): Wednesday: 5:00 PM - 7:00 PM', true);
INSERT INTO public.program_schedules VALUES (19, 8, 'Sunday', '10:00', '11:30', 'Children (Ages 4-13): Sunday: 10:00 AM - 11:30 AM', true);
INSERT INTO public.program_schedules VALUES (20, 8, 'Friday', '18:30', '20:30', 'Adults (Ages 14+): Friday: 6:30 PM - 8:30 PM', true);
INSERT INTO public.program_schedules VALUES (21, 8, 'Sunday', '11:30', '14:00', 'Adults (Ages 14+): Sunday: 11:30 AM - 2:00 PM (Technical)', true);
INSERT INTO public.program_schedules VALUES (22, 8, 'Sunday', '13:30', '15:00', 'Adults (Ages 14+): Sunday: 1:30 PM - 3:00 PM (Sparring)', true);
INSERT INTO public.program_schedules VALUES (23, 9, 'Tuesday', '19:30', '21:00', 'Tuesday: 7:30 PM - 9:00 PM', true);
INSERT INTO public.program_schedules VALUES (24, 10, 'Tuesday', '15:00', '18:00', 'Tuesday: 3:00 PM - 6:00 PM', true);
INSERT INTO public.program_schedules VALUES (25, 10, 'Saturday', '10:00', '13:00', 'Saturday: 10:00 AM - 1:00 PM', true);
INSERT INTO public.program_schedules VALUES (27, 12, 'Tuesday', '10:00', '11:00', 'Tuesday: 10:00 AM - 11:00 AM', true);
INSERT INTO public.program_schedules VALUES (28, 12, 'Tuesday', '18:15', '19:15', 'Tuesday: 6:15 PM - 7:15 PM', true);
INSERT INTO public.program_schedules VALUES (32, 11, NULL, NULL, NULL, 'Contact for current schedule', true);


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: wacc_user
--



--
-- Data for Name: site_settings; Type: TABLE DATA; Schema: public; Owner: wacc_user
--

INSERT INTO public.site_settings VALUES (7, 'hero_description', 'From Stay & Play sessions for young families to martial arts, fitness classes, and cultural groups — we''re here to bring our community together and support wellbeing for all ages.', 'text', 'Description text displayed on the homepage hero section', '2025-08-13 18:57:36.322');
INSERT INTO public.site_settings VALUES (8, 'contact_phone', '+44 20 1234 5678', 'text', 'Main contact phone number', '2025-08-13 18:57:36.322');
INSERT INTO public.site_settings VALUES (9, 'contact_email', 'info@westactoncc.org.uk', 'text', 'Main contact email address', '2025-08-13 18:57:36.322');
INSERT INTO public.site_settings VALUES (10, 'address', 'West Acton Community Centre, High Street, London W3', 'text', 'Physical address of the centre', '2025-08-13 18:57:36.323');
INSERT INTO public.site_settings VALUES (1, 'site_title', 'West Acton Community Centre', 'text', 'Main site title', '2025-08-13 18:57:36.316');
INSERT INTO public.site_settings VALUES (5, 'site_description', 'A vibrant community centre serving West Acton and surrounding areas', 'text', 'Site description used in meta tags and social sharing', '2025-08-13 18:57:36.319');
INSERT INTO public.site_settings VALUES (14, 'hero_subtitle', 'Your local hub for education, leisure, and recreational programs. We serve over 2,000 residents in West Acton with 15+ regular programs every week.', 'text', 'Subtitle text displayed on the homepage hero section', '2025-08-13 18:57:36.32');
INSERT INTO public.site_settings VALUES (11, 'residents_served', '2,000+', 'text', 'Number of residents served (displayed in stats)', '2025-08-13 18:57:36.323');
INSERT INTO public.site_settings VALUES (3, 'weekly_programs', '15', 'number', 'Number of regular programs per week', '2025-08-13 18:57:36.323');
INSERT INTO public.site_settings VALUES (15, 'opening_hours_text', '7 days', 'text', 'Short opening hours text (e.g., "7 days")', '2025-08-13 18:57:36.324');
INSERT INTO public.site_settings VALUES (16, 'opening_hours_details', 'Monday to Sunday, 7am-11pm', 'text', 'Detailed opening hours information', '2025-08-13 18:57:36.324');
INSERT INTO public.site_settings VALUES (17, 'social_facebook', '', 'text', 'Facebook page URL', '2025-08-13 18:57:36.325');
INSERT INTO public.site_settings VALUES (18, 'social_twitter', '', 'text', 'Twitter profile URL', '2025-08-13 18:57:36.325');
INSERT INTO public.site_settings VALUES (19, 'social_instagram', '', 'text', 'Instagram profile URL', '2025-08-13 18:57:36.325');
INSERT INTO public.site_settings VALUES (20, 'booking_enabled', 'true', 'boolean', 'Enable online booking functionality', '2025-08-13 18:57:36.325');
INSERT INTO public.site_settings VALUES (21, 'maintenance_mode', 'false', 'boolean', 'Enable maintenance mode for the site', '2025-08-13 18:57:36.325');
INSERT INTO public.site_settings VALUES (2, 'community_residents', '2000', 'number', 'Number of residents served', '2025-08-13 18:57:36.325');
INSERT INTO public.site_settings VALUES (41, 'hero_background_image', 'https://bucket-wacc1.f47d23c072e7b2f871ecca11e36e0b25.r2.cloudflarestorage.com/uploads/1755111141901_3c8ri3_outside-1.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=1b6772892999957d50aede7703a8627e%2F20250813%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20250813T185222Z&X-Amz-Expires=604800&X-Amz-Signature=ced8d4af8d73d113a47254230b9848d00924006413161aa6591fa2c4b3c7e85d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject', 'string', 'Hero section background image', '2025-08-13 18:57:36.325');
INSERT INTO public.site_settings VALUES (43, 'hero_cta_button_link', '/programs', 'string', 'Hero section cta button_link', '2025-08-13 18:57:36.325');
INSERT INTO public.site_settings VALUES (42, 'hero_cta_button_text', 'EXPLORE OUR PROGRAMS', 'string', 'Hero section cta button_text', '2025-08-13 18:57:36.325');
INSERT INTO public.site_settings VALUES (4, 'main_hall_capacity', '120', 'text', '🏢 FACILITIES - capacity', '2025-08-13 20:01:21.321');


--
-- Data for Name: testimonials; Type: TABLE DATA; Schema: public; Owner: wacc_user
--

INSERT INTO public.testimonials VALUES (4, 'WACC has been such a blessing for our family. The Stay & Play sessions give our toddler a chance to socialize while I connect with other parents in the community.', 'Sarah Johnson', 'Parent, West Acton resident', '/img/user-1.png', true, 1, '2025-08-13 18:18:07.263');
INSERT INTO public.testimonials VALUES (5, 'I''ve been attending Taekwondo classes here for 3 years. The instructors are excellent and the community spirit is amazing. It''s not just exercise - it''s a second home.', 'David Chen', 'Taekwondo student', '/img/user-1.png', true, 2, '2025-08-13 18:18:07.263');
INSERT INTO public.testimonials VALUES (6, 'We recently held our community fundraiser here and the staff were incredibly helpful. The Main Hall was perfect for our event and the kitchen facilities made catering so much easier.', 'Amira Hassan', 'Community organizer', '/img/user-1.png', true, 3, '2025-08-13 18:18:07.263');


--
-- Data for Name: verificationtokens; Type: TABLE DATA; Schema: public; Owner: wacc_user
--



--
-- Name: booking_availability_id_seq; Type: SEQUENCE SET; Schema: public; Owner: wacc_user
--

SELECT pg_catalog.setval('public.booking_availability_id_seq', 1, false);


--
-- Name: bookings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: wacc_user
--

SELECT pg_catalog.setval('public.bookings_id_seq', 1, false);


--
-- Name: community_groups_id_seq; Type: SEQUENCE SET; Schema: public; Owner: wacc_user
--

SELECT pg_catalog.setval('public.community_groups_id_seq', 2, true);


--
-- Name: contact_info_id_seq; Type: SEQUENCE SET; Schema: public; Owner: wacc_user
--

SELECT pg_catalog.setval('public.contact_info_id_seq', 8, true);


--
-- Name: facilities_id_seq; Type: SEQUENCE SET; Schema: public; Owner: wacc_user
--

SELECT pg_catalog.setval('public.facilities_id_seq', 4, true);


--
-- Name: facility_services_id_seq; Type: SEQUENCE SET; Schema: public; Owner: wacc_user
--

SELECT pg_catalog.setval('public.facility_services_id_seq', 4, true);


--
-- Name: faq_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: wacc_user
--

SELECT pg_catalog.setval('public.faq_items_id_seq', 8, true);


--
-- Name: media_library_id_seq; Type: SEQUENCE SET; Schema: public; Owner: wacc_user
--

SELECT pg_catalog.setval('public.media_library_id_seq', 7, true);


--
-- Name: opening_hours_id_seq; Type: SEQUENCE SET; Schema: public; Owner: wacc_user
--

SELECT pg_catalog.setval('public.opening_hours_id_seq', 4, true);


--
-- Name: program_schedules_id_seq; Type: SEQUENCE SET; Schema: public; Owner: wacc_user
--

SELECT pg_catalog.setval('public.program_schedules_id_seq', 32, true);


--
-- Name: programs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: wacc_user
--

SELECT pg_catalog.setval('public.programs_id_seq', 12, true);


--
-- Name: site_settings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: wacc_user
--

SELECT pg_catalog.setval('public.site_settings_id_seq', 68, true);


--
-- Name: testimonials_id_seq; Type: SEQUENCE SET; Schema: public; Owner: wacc_user
--

SELECT pg_catalog.setval('public.testimonials_id_seq', 6, true);


--
-- PostgreSQL database dump complete
--

