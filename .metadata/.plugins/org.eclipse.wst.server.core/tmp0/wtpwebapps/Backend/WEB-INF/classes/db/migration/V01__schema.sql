--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.2
-- Dumped by pg_dump version 9.6.2

-- Started on 2017-06-12 08:39:17 BRT
--
--SET statement_timeout = 0;
--SET lock_timeout = 0;
--SET idle_in_transaction_session_timeout = 0;
--SET client_encoding = 'UTF8';
--SET standard_conforming_strings = on;
--SET check_function_bodies = false;
--SET client_min_messages = warning;
--SET row_security = off;
--
----
---- TOC entry 2193 (class 1262 OID 16457)
---- Name: banco_desafio; Type: DATABASE; Schema: -; Owner: postgres
----
--
--CREATE DATABASE banco_desafio WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'pt_BR.UTF-8' LC_CTYPE = 'pt_BR.UTF-8';
--
--
--ALTER DATABASE banco_desafio OWNER TO postgres;
--
--\connect banco_desafio
--
--SET statement_timeout = 0;
--SET lock_timeout = 0;
--SET idle_in_transaction_session_timeout = 0;
--SET client_encoding = 'UTF8';
--SET standard_conforming_strings = on;
--SET check_function_bodies = false;
--SET client_min_messages = warning;
--SET row_security = off;

--
-- TOC entry 1 (class 3079 OID 12429)
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- TOC entry 2195 (class 0 OID 0)
-- Dependencies: 1
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

--
-- TOC entry 563 (class 1247 OID 32908)
-- Name: permissoes; Type: TYPE; Schema: public; Owner: postgres
--

--CREATE TYPE permissoes AS ENUM (
--    'Administrador',
--    'Colaborador'
--);


ALTER TYPE permissoes OWNER TO postgres;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 187 (class 1259 OID 33233)
-- Name: conta; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE conta (
    numero bigint NOT NULL,
    criador bytea,
    data_alteracao date,
    data_cadastro date,
    descricao character varying(255),
    nome character varying(255),
    saldo double precision,
    ultimo_alterador bytea
);


ALTER TABLE conta OWNER TO postgres;

--
-- TOC entry 186 (class 1259 OID 33231)
-- Name: conta_numero_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE conta_numero_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE conta_numero_seq OWNER TO postgres;

--
-- TOC entry 2196 (class 0 OID 0)
-- Dependencies: 186
-- Name: conta_numero_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE conta_numero_seq OWNED BY conta.numero;


--
-- TOC entry 185 (class 1259 OID 32992)
-- Name: hibernate_sequence; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE hibernate_sequence
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE hibernate_sequence OWNER TO postgres;

--
-- TOC entry 189 (class 1259 OID 33257)
-- Name: transacao; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE transacao (
    id bigint NOT NULL,
    criador bytea,
    data_alteracao date,
    data_cadastro date,
    data_efetivacao date,
    data_transacao date,
    descricao character varying(255),
    efetivado boolean NOT NULL,
    efetivador bytea,
    ult_alterador bytea,
    valor double precision NOT NULL,
    conta_destino bigint,
    conta_origem bigint
);


ALTER TABLE transacao OWNER TO postgres;

--
-- TOC entry 188 (class 1259 OID 33255)
-- Name: transacao_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE transacao_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE transacao_id_seq OWNER TO postgres;

--
-- TOC entry 2197 (class 0 OID 0)
-- Dependencies: 188
-- Name: transacao_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE transacao_id_seq OWNED BY transacao.id;


--
-- TOC entry 191 (class 1259 OID 33276)
-- Name: usuario; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE usuario (
    id bigint NOT NULL,
    ativo boolean NOT NULL,
    celular character varying(255),
    cpf character varying(255),
    criador bytea,
    data_alteracao date,
    data_cadastro date,
    email character varying(255),
    endereco character varying(255),
    nome character varying(255),
    permissoes character varying(255),
    senha character varying(255),
    ultimo_alterador bytea
);


ALTER TABLE usuario OWNER TO postgres;

--
-- TOC entry 190 (class 1259 OID 33274)
-- Name: usuario_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE usuario_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE usuario_id_seq OWNER TO postgres;

--
-- TOC entry 2198 (class 0 OID 0)
-- Dependencies: 190
-- Name: usuario_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE usuario_id_seq OWNED BY usuario.id;


--
-- TOC entry 2061 (class 2604 OID 33236)
-- Name: conta numero; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY conta ALTER COLUMN numero SET DEFAULT nextval('conta_numero_seq'::regclass);


--
-- TOC entry 2062 (class 2604 OID 33260)
-- Name: transacao id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY transacao ALTER COLUMN id SET DEFAULT nextval('transacao_id_seq'::regclass);


--
-- TOC entry 2063 (class 2604 OID 33279)
-- Name: usuario id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY usuario ALTER COLUMN id SET DEFAULT nextval('usuario_id_seq'::regclass);


--
-- TOC entry 2065 (class 2606 OID 33241)
-- Name: conta conta_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY conta
    ADD CONSTRAINT conta_pkey PRIMARY KEY (numero);


--
-- TOC entry 2067 (class 2606 OID 33265)
-- Name: transacao transacao_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY transacao
    ADD CONSTRAINT transacao_pkey PRIMARY KEY (id);


--
-- TOC entry 2069 (class 2606 OID 33284)
-- Name: usuario usuario_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY usuario
    ADD CONSTRAINT usuario_pkey PRIMARY KEY (id);


--
-- TOC entry 2071 (class 2606 OID 33303)
-- Name: transacao fkknuq5yi1h2sjspj0hd82s6m90; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY transacao
    ADD CONSTRAINT fkknuq5yi1h2sjspj0hd82s6m90 FOREIGN KEY (conta_origem) REFERENCES conta(numero);


--
-- TOC entry 2070 (class 2606 OID 33298)
-- Name: transacao fkrqm4qdce8dn0ivswg0pg9rt4i; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY transacao
    ADD CONSTRAINT fkrqm4qdce8dn0ivswg0pg9rt4i FOREIGN KEY (conta_destino) REFERENCES conta(numero);


-- Completed on 2017-06-12 08:39:17 BRT

--
-- PostgreSQL database dump complete
--
