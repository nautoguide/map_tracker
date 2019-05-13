--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.11
-- Dumped by pg_dump version 11.2

-- Started on 2019-05-01 10:16:08

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 12776 (class 0 OID 9328604)
-- Dependencies: 2217
-- Data for Name: users; Type: TABLE DATA; Schema: ng_adventuresyndicate; Owner: rachis
--

INSERT INTO ng_adventuresyndicate.users (user_name, user_email, user_active, user_password, user_attributes, user_type_id, user_created, last_login, failed_login_count, current_token, current_token_expiry, current_token_attributes, user_timeout, schema, subordinates, alternative_email)
VALUES ('as_api_user', 'adventuresynidcate@nautoguide.com', true, '4e8169cdef254d22eb3f171b2c12b66c9d3914ae', NULL, 534, '2019-03-09 15:26:01.131659', NULL, 0, 'QW123RT6Y', '2024-03-09 15:26:01.131659', NULL, '2019-03-09 15:21:01.131659', 'ng_adventuresyndicate', NULL, NULL);


-- Completed on 2019-05-01 10:16:14

--
-- PostgreSQL database dump complete
--

