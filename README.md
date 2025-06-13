# Project: Findt

**A headless, multi-tenant search API to supercharge your product catalog.**

![build](https://img.shields.io/badge/build-passing-brightgreen) ![docs](https://img.shields.io/badge/docs-complete-blue) ![license](https://img.shields.io/badge/license-MIT-lightgrey)

## What is Findt?

Findt is a multi-tenant, search-as-a-service platform designed for developers and product teams. It provides the backend infrastructure to let you define your own schemas, import data, and get a blazing-fast, secure search API endpoint to embed anywhere.

Think of it as your own private, customizable Algolia or Elasticsearch instance but without the DevOps headache.

### Core Features

- ✅ **Dynamic, Per-Index Schema:** You define your own data structures with custom tags, types, and search rules.
- ✅ **Powerful Full-Text Search:** Backed by Elasticsearch, with language analysis, synonyms, and relevance tuning.
- ✅ **Effortless Data Ingestion:** Bulk import via CSV through an asynchronous pipeline or manage search objects with a simple CRUD API.
- ✅ **Headless & Secure API:** Get your unique, rate-limited API key and a dedicated endpoint for search.
- ✅ **Built to Scale:** Asynchronous job processing using a modern, cloud-native architecture.

## How It Works: The Architecture

The system is designed as a modern, cloud-native application with a clear separation of concerns:

- **Frontend:** A React Single-Page Application (SPA) serving as the tenant-facing **Admin Panel**.
- **Backend API:** A Node.js (NestJS) application acting as the central controller.
- **Metadata Store:** **MongoDB** serves as the primary database for all objects information, schema definitions, and synonym lists.
- **Data Ingestion Pipeline:**
  - **Amazon S3:** For staging large CSV product imports.
  - **Amazon SQS:** To queue import jobs for reliable, asynchronous processing.
  - **Processor Service:** A serverless function (e.g., AWS Lambda) that consumes from SQS, validates data, and indexes it.
- **Search Engine:** **Elasticsearch**, using a dedicated **index-per-tenant** strategy for strong data isolation and custom schema/synonym support.
- **Caching Layer:** **Redis** for caching frequently accessed metadata and popular search queries to improve performance and reduce database load.
                        |
