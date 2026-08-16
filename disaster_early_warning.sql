--
-- PostgreSQL database dump
--

\restrict rNgoyGlFgGTeMgsSpR45CIshJAvLzUWblM8HEKBfAp21As8F9orasuoqvx69K3v

-- Dumped from database version 18.4
-- Dumped by pg_dump version 18.4

-- Started on 2026-08-16 13:17:31

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 878 (class 1247 OID 16798)
-- Name: NotificationStatus; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."NotificationStatus" AS ENUM (
    'SENT',
    'PENDING',
    'FAILED'
);


ALTER TYPE public."NotificationStatus" OWNER TO postgres;

--
-- TOC entry 875 (class 1247 OID 16789)
-- Name: RiskLevel; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."RiskLevel" AS ENUM (
    'AMAN',
    'WASPADA',
    'SIAGA',
    'BAHAYA'
);


ALTER TYPE public."RiskLevel" OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 223 (class 1259 OID 16420)
-- Name: Earthquake; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Earthquake" (
    id integer NOT NULL,
    magnitude double precision NOT NULL,
    depth double precision NOT NULL,
    latitude double precision NOT NULL,
    longitude double precision NOT NULL,
    location text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "bmkgId" text NOT NULL,
    "earthquakeTime" timestamp(3) without time zone NOT NULL,
    potential text,
    felt text,
    shakemap text,
    "shakemapUrl" text,
    "eventDate" text,
    "eventTime" text
);


ALTER TABLE public."Earthquake" OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 16419)
-- Name: Earthquake_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Earthquake_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Earthquake_id_seq" OWNER TO postgres;

--
-- TOC entry 5069 (class 0 OID 0)
-- Dependencies: 222
-- Name: Earthquake_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Earthquake_id_seq" OWNED BY public."Earthquake".id;


--
-- TOC entry 227 (class 1259 OID 16591)
-- Name: Notification; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Notification" (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    title text NOT NULL,
    message text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    status public."NotificationStatus" NOT NULL,
    "riskResultId" integer,
    "sentAt" timestamp(3) without time zone
);


ALTER TABLE public."Notification" OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 16590)
-- Name: Notification_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Notification_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Notification_id_seq" OWNER TO postgres;

--
-- TOC entry 5070 (class 0 OID 0)
-- Dependencies: 226
-- Name: Notification_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Notification_id_seq" OWNED BY public."Notification".id;


--
-- TOC entry 225 (class 1259 OID 16571)
-- Name: RiskResult; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."RiskResult" (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    "earthquakeId" integer NOT NULL,
    distance double precision NOT NULL,
    "fuzzyDistance" double precision NOT NULL,
    "fuzzyMagnitude" double precision NOT NULL,
    "fuzzyDepth" double precision NOT NULL,
    "sawScore" double precision NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "riskLevel" public."RiskLevel" NOT NULL
);


ALTER TABLE public."RiskResult" OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 16570)
-- Name: RiskResult_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."RiskResult_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."RiskResult_id_seq" OWNER TO postgres;

--
-- TOC entry 5071 (class 0 OID 0)
-- Dependencies: 224
-- Name: RiskResult_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."RiskResult_id_seq" OWNED BY public."RiskResult".id;


--
-- TOC entry 221 (class 1259 OID 16406)
-- Name: User; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."User" (
    id integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    latitude double precision,
    longitude double precision,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "fcmToken" text,
    password text NOT NULL,
    "lastLocationUpdate" timestamp(3) without time zone,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."User" OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 16405)
-- Name: User_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."User_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."User_id_seq" OWNER TO postgres;

--
-- TOC entry 5072 (class 0 OID 0)
-- Dependencies: 220
-- Name: User_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."User_id_seq" OWNED BY public."User".id;


--
-- TOC entry 219 (class 1259 OID 16391)
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
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


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- TOC entry 4886 (class 2604 OID 16423)
-- Name: Earthquake id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Earthquake" ALTER COLUMN id SET DEFAULT nextval('public."Earthquake_id_seq"'::regclass);


--
-- TOC entry 4890 (class 2604 OID 16594)
-- Name: Notification id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Notification" ALTER COLUMN id SET DEFAULT nextval('public."Notification_id_seq"'::regclass);


--
-- TOC entry 4888 (class 2604 OID 16574)
-- Name: RiskResult id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."RiskResult" ALTER COLUMN id SET DEFAULT nextval('public."RiskResult_id_seq"'::regclass);


--
-- TOC entry 4883 (class 2604 OID 16409)
-- Name: User id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User" ALTER COLUMN id SET DEFAULT nextval('public."User_id_seq"'::regclass);


--
-- TOC entry 5059 (class 0 OID 16420)
-- Dependencies: 223
-- Data for Name: Earthquake; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Earthquake" (id, magnitude, depth, latitude, longitude, location, "createdAt", "bmkgId", "earthquakeTime", potential, felt, shakemap, "shakemapUrl", "eventDate", "eventTime") FROM stdin;
51	4.9	38	-4.68	102.74	Pusat gempa berada di laut 31 km barat daya Bengkulu Selatan	2026-06-23 14:59:21.664	2026-06-22T18:03:48+00:00	2026-06-22 18:03:48	Gempa ini dirasakan untuk diteruskan pada masyarakat	III - IV Bengkulu Selatan, III Seluma, III Kaur, III P. Enggano, II - III Kota Bengkulu, II - III Bengkulu Utara, II - III Kepahiang	20260623010348.mmi.jpg	https://data.bmkg.go.id/DataMKG/TEWS/20260623010348.mmi.jpg	\N	\N
52	2.4	3	-6.86	107.05	Pusat gempa berada di darat 11 km barat daya Kab. Cianjur	2026-06-24 04:53:25.594	2026-06-23T21:08:50+00:00	2026-06-23 21:08:50	Gempa ini dirasakan untuk diteruskan pada masyarakat	II Cugenang	20260624040850.mmi.jpg	https://data.bmkg.go.id/DataMKG/TEWS/20260624040850.mmi.jpg	24 Jun 2026	04:08:50 WIB
53	4	4	-1.26	120.31	Pusat gempa berada di darat 49 km timur Sigi	2026-06-27 02:13:09.153	2026-06-26T13:47:15+00:00	2026-06-26 13:47:15	Gempa ini dirasakan untuk diteruskan pada masyarakat	II-III Palu, II-III Sigi	20260626204715.mmi.jpg	https://data.bmkg.go.id/DataMKG/TEWS/20260626204715.mmi.jpg	26 Jun 2026	20:47:15 WIB
54	4.9	25	-6.24	104.74	Pusat gempa berada di laut 82 km selatan Tanggamus	2026-06-28 02:55:34.213	2026-06-27T21:10:33+00:00	2026-06-27 21:10:33	Gempa ini dirasakan untuk diteruskan pada masyarakat	III Kota Agung , III Tanggamus, II Bandar Lampung	20260628041033.mmi.jpg	https://data.bmkg.go.id/DataMKG/TEWS/20260628041033.mmi.jpg	28 Jun 2026	04:10:33 WIB
55	4.4	29	-2.84	140.07	Pusat gempa berada di darat 30 km Selatan Genyem Jayapura	2026-07-02 17:12:17.345	2026-07-02T01:21:12+00:00	2026-07-02 01:21:12	Gempa ini dirasakan untuk diteruskan pada masyarakat	II Jayapura	20260702082112.mmi.jpg	https://data.bmkg.go.id/DataMKG/TEWS/20260702082112.mmi.jpg	02 Jul 2026	08:21:12 WIB
56	2.6	10	2.04	98.99	Pusat gempa berada di darat 4 km Timur laut Tapanuli Utara	2026-07-03 06:23:43.902	2026-07-03T05:19:32+00:00	2026-07-03 05:19:32	Gempa ini dirasakan untuk diteruskan pada masyarakat	II Tarutung	20260703121932.mmi.jpg	https://data.bmkg.go.id/DataMKG/TEWS/20260703121932.mmi.jpg	03 Jul 2026	12:19:32 WIB
89	2.6	25	-6.8	107.68	Pusat gempa berada di darat 16 km Timur Laut Kota Cimahi	2026-07-10 01:31:45.068	2026-07-09T05:10:59+00:00	2026-07-09 05:10:59	Gempa ini dirasakan untuk diteruskan pada masyarakat	II-III Lembang, II-III Parongpong	20260709121059.mmi.jpg	https://data.bmkg.go.id/DataMKG/TEWS/20260709121059.mmi.jpg	09 Jul 2026	12:10:59 WIB
90	3.8	10	1.09	120.92	Pusat gempa berada di darat 30 km timur laut Toli-Toli	2026-07-17 07:16:29.12	2026-07-17T00:32:50+00:00	2026-07-17 00:32:50	Gempa ini dirasakan untuk diteruskan pada masyarakat	II-III Toli-Toli	20260717073250.mmi.jpg	https://data.bmkg.go.id/DataMKG/TEWS/20260717073250.mmi.jpg	17 Jul 2026	07:32:50 WIB
91	3.8	82	-8.95	115.62	Pusat gempa berada di laut 47 km timur Kuta Selatan	2026-07-19 04:09:31.798	2026-07-18T19:55:40+00:00	2026-07-18 19:55:40	Gempa ini dirasakan untuk diteruskan pada masyarakat	II Badung, II Gianyar	20260719025540.mmi.jpg	https://data.bmkg.go.id/DataMKG/TEWS/20260719025540.mmi.jpg	19 Jul 2026	02:55:40 WIB
\.


--
-- TOC entry 5063 (class 0 OID 16591)
-- Dependencies: 227
-- Data for Name: Notification; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Notification" (id, "userId", title, message, "createdAt", status, "riskResultId", "sentAt") FROM stdin;
\.


--
-- TOC entry 5061 (class 0 OID 16571)
-- Dependencies: 225
-- Data for Name: RiskResult; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."RiskResult" (id, "userId", "earthquakeId", distance, "fuzzyDistance", "fuzzyMagnitude", "fuzzyDepth", "sawScore", "createdAt", "riskLevel") FROM stdin;
1	1	52	75.95	0.7405	0.8	0.1	0.6302	2026-07-02 07:04:49.32	SIAGA
2	2	52	75.85	0.7415	0.8	0.1	0.6308	2026-07-02 13:25:44.531	SIAGA
3	2	52	75.85	0.7415	0.8	0.1	0.6308	2026-07-10 01:32:53.11	SIAGA
4	2	89	113.22	0.3678	0.7	0.8333	0.5606	2026-07-10 01:33:39.581	SIAGA
5	2	89	113.22	0.3678	0.7	0.8333	0.5606	2026-07-10 06:50:55.86	SIAGA
6	2	89	98.33	0.5167	0.7	0.8333	0.635	2026-07-10 07:01:48.142	SIAGA
7	2	89	18.53	1	0.7	0.8333	0.8767	2026-07-10 08:20:49.227	BAHAYA
\.


--
-- TOC entry 5057 (class 0 OID 16406)
-- Dependencies: 221
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."User" (id, name, email, latitude, longitude, "createdAt", "fcmToken", password, "lastLocationUpdate", "updatedAt") FROM stdin;
1	Dzaikra Ernandifa	dzaikra@gmail.com	\N	\N	2026-07-01 01:16:58.606	\N	$2b$10$5HLYo6zj5sBJ11WFa5qTY.tZkjlrJBtTYs2Kh0Vf14dzoIjMAsR1i	\N	2026-07-16 14:34:02.555
2	Berlian Sandika	berlianfritzi@gmail.com	\N	\N	2026-07-02 12:58:03.045	\N	$2b$10$7uYXeuCfR3QUwT4iCd6Tx.FEJdhOpf8/whkSUKJFDIFVUNiLo8gBC	\N	2026-07-16 14:34:02.555
\.


--
-- TOC entry 5055 (class 0 OID 16391)
-- Dependencies: 219
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
e3cd5cfb-acdc-4310-84e3-670241a09d00	c2e6ec88383c1421c61a1ac7e269171925601fcbd8dbb2485e6f29a93fde1763	2026-05-21 08:21:08.170191+07	20260521012108_init	\N	\N	2026-05-21 08:21:08.142371+07	1
34eaf5b1-a290-4d03-a5c5-5d99a4644cf0	6bcb1005125121f5332242c2abdaf82e44275b758bd59d9561402464580546c8	2026-05-21 09:03:36.476116+07	20260521020336_update_database_design	\N	\N	2026-05-21 09:03:36.379799+07	1
9620eed0-a2f4-4c8f-9352-bf9696d6bcf3	a4b64fa384d4d003deba6407a4c3762cc53dca724ffaf553c6b1077932252aad	2026-05-21 09:10:07.38838+07	20260521021007_add_enum_risklevel_notification	\N	\N	2026-05-21 09:10:07.340664+07	1
8a83ab78-37cd-46e8-b6f2-aba588b6d216	fdecc3d1da13a42391ec19842dd632ff193a39c40f6ddc1a6f30bfcb2571d7a7	2026-06-23 21:50:24.231069+07	20260623145024_final_schema_v1	\N	\N	2026-06-23 21:50:24.105011+07	1
5518e6a5-9f5e-4f96-a385-bd78b0eff2f2	2cf511ce4eb1c0b016c3dc8eb63d3926e1516c9383f156f0282aeb7b943fcd38	2026-06-24 11:52:53.433195+07	20260624045253_final_schema_v2	\N	\N	2026-06-24 11:52:53.403144+07	1
8a62e227-0f5a-4726-b5fd-4dec3c334900	eb7b8daec0ee36044749897ffa29c96c41df26fac64762d6285882b2cbf3c99d	2026-07-01 07:47:12.3569+07	20260701004712_add_user_password	\N	\N	2026-07-01 07:47:12.289429+07	1
837150a0-87a2-46f5-a528-4af21337a1af	c6bcb0be13c65abf083fec86a4d822b1f0fcb7046225070e025dc057fe4e86dc	2026-07-16 14:34:02.627558+07	20260716073402_add_user_location	\N	\N	2026-07-16 14:34:02.546477+07	1
\.


--
-- TOC entry 5073 (class 0 OID 0)
-- Dependencies: 222
-- Name: Earthquake_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Earthquake_id_seq"', 91, true);


--
-- TOC entry 5074 (class 0 OID 0)
-- Dependencies: 226
-- Name: Notification_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Notification_id_seq"', 1, false);


--
-- TOC entry 5075 (class 0 OID 0)
-- Dependencies: 224
-- Name: RiskResult_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."RiskResult_id_seq"', 7, true);


--
-- TOC entry 5076 (class 0 OID 0)
-- Dependencies: 220
-- Name: User_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."User_id_seq"', 2, true);


--
-- TOC entry 4899 (class 2606 OID 16435)
-- Name: Earthquake Earthquake_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Earthquake"
    ADD CONSTRAINT "Earthquake_pkey" PRIMARY KEY (id);


--
-- TOC entry 4903 (class 2606 OID 16604)
-- Name: Notification Notification_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Notification"
    ADD CONSTRAINT "Notification_pkey" PRIMARY KEY (id);


--
-- TOC entry 4901 (class 2606 OID 16589)
-- Name: RiskResult RiskResult_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."RiskResult"
    ADD CONSTRAINT "RiskResult_pkey" PRIMARY KEY (id);


--
-- TOC entry 4896 (class 2606 OID 16418)
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- TOC entry 4893 (class 2606 OID 16404)
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- TOC entry 4897 (class 1259 OID 17232)
-- Name: Earthquake_bmkgId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Earthquake_bmkgId_key" ON public."Earthquake" USING btree ("bmkgId");


--
-- TOC entry 4894 (class 1259 OID 16436)
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- TOC entry 4906 (class 2606 OID 17233)
-- Name: Notification Notification_riskResultId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Notification"
    ADD CONSTRAINT "Notification_riskResultId_fkey" FOREIGN KEY ("riskResultId") REFERENCES public."RiskResult"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 4907 (class 2606 OID 16615)
-- Name: Notification Notification_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Notification"
    ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4904 (class 2606 OID 16610)
-- Name: RiskResult RiskResult_earthquakeId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."RiskResult"
    ADD CONSTRAINT "RiskResult_earthquakeId_fkey" FOREIGN KEY ("earthquakeId") REFERENCES public."Earthquake"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4905 (class 2606 OID 16605)
-- Name: RiskResult RiskResult_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."RiskResult"
    ADD CONSTRAINT "RiskResult_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


-- Completed on 2026-08-16 13:17:31

--
-- PostgreSQL database dump complete
--

\unrestrict rNgoyGlFgGTeMgsSpR45CIshJAvLzUWblM8HEKBfAp21As8F9orasuoqvx69K3v

