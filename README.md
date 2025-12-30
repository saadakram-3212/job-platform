# Web-to-Native Conversion Platform

## Overview

This platform automatically converts web applications into native mobile apps using intelligent analysis, structured blueprinting, and AI-driven code generation. It analyzes both the source code and runtime behavior of web apps to produce production-ready Flutter applications with native integrations.

## How It Works

The platform takes a web application as input (via Git repository, file upload, or hosted URL) and performs comprehensive analysis to understand its structure, behavior, and functionality. It then generates an equivalent native mobile app that maintains feature parity while leveraging native mobile capabilities.

### Conversion Pipeline

1. **Ingest** - Collect source code, assets, and configuration
2. **Analyze** - Parse code structure and record runtime behavior
3. **Blueprint** - Create a canonical representation of the app
4. **Map** - Transform web constructs into native equivalents
5. **Generate** - Produce Flutter project with native integrations
6. **Refine** - Allow iterative editing and AI-driven improvements
7. **Build** - Compile to APK/IPA for deployment

## Main Components

### Backend API

The core orchestration layer that manages the conversion workflow and coordinates between components.

- **API Server**: Handles user requests, authentication, and job management
- **Orchestrator**: Coordinates analysis, generation, and build processes
- **LLM Integration**: Interfaces with GPT/Claude for intelligent code generation and refinement
- **Editor Service**: Provides code editing capabilities with live preview

**Tech Stack**: Node.js, TypeScript, Express/Fastify

### Worker Services

Distributed processing units that handle computationally intensive tasks.

- **Static Analysis Worker**: Parses JavaScript/TypeScript/HTML/CSS into ASTs, extracts components, routes, state management, and API calls
- **Runtime Analysis Worker**: Uses Puppeteer/Playwright for headless browser instrumentation, records DOM events, network traffic, and user flows
- **Blueprint Generator**: Combines static and runtime data into structured JSON representation
- **Code Generation Worker**: Produces Flutter projects from blueprints using template-based and AST-aware generation
- **Diff & Patch Worker**: Computes incremental updates and preserves user modifications

**Tech Stack**: Node.js workers, Python for analysis tools, Babel, SWC, Tree-sitter

### CI/CD Pipeline

Automated validation, testing, and build infrastructure.

- **Validation**: Runs `flutter analyze` and static checks
- **Testing**: Executes functional parity tests and visual regression tests
- **Compilation**: Performs dry runs to catch errors early
- **Build Service**: Integrates with Codemagic/BuildShip for APK/IPA generation
- **LLM Fixer**: Automatically resolves compilation issues using AI

**Tech Stack**: GitHub Actions, Codemagic, BuildShip

### Storage Layer

Persistent data management for artifacts, projects, and analysis results.

- **Database**: Stores user projects, blueprints, conversion metadata, and job status
- **Object Storage**: Manages source code archives, generated projects, build artifacts, and assets
- **Vector Database**: Enables RAG (Retrieval-Augmented Generation) for context-aware code generation
- **Cache**: Improves performance for repeated analysis and common patterns

**Tech Stack**: PostgreSQL/MongoDB, S3/Supabase, Vector DB (Pinecone/Weaviate)

## Key Features

- **Intelligent Mapping**: Automatically maps HTML/CSS/JS to Flutter widgets and APIs
- **State Management**: Converts web state patterns to Provider/Riverpod/Bloc
- **API Integration**: Transforms REST/GraphQL calls to native HTTP clients
- **Native Features**: Adds mobile-specific capabilities (camera, push notifications, sensors)
- **Incremental Updates**: AST-based diffing preserves user modifications
- **Live Preview**: Real-time preview with web or cloud emulator
- **AI Refinement**: Iterative improvements using large language models


## Getting Started

```bash
# Clone the repository
git clone git@github.com:saadakram-3212/job-platform.git

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Start development server
npm run dev
```

## Architecture Diagram

```
┌─────────────┐
│   Web App   │
└──────┬──────┘
       │
       v
┌─────────────────────────────────────┐
│         Backend API                 │
│  (Orchestration & LLM Integration)  │
└──────┬──────────────────────────────┘
       │
       v
┌─────────────────────────────────────┐
│        Worker Services              │
│  ┌──────────┐  ┌─────────────┐      │
│  │ Static   │  │  Runtime    │      │
│  │ Analysis │  │  Analysis   │      │
│  └──────────┘  └─────────────┘      │
│  ┌──────────┐  ┌─────────────┐      │
│  │Blueprint │  │    Code     │      │
│  │Generator │  │  Generator  │      │
│  └──────────┘  └─────────────┘      │
└──────┬──────────────────────────────┘
       │
       v
┌─────────────────────────────────────┐
│         CI/CD Pipeline              │
│  (Validation, Testing, Building)    │
└──────┬──────────────────────────────┘
       │
       v
┌─────────────────────────────────────┐
│      Storage Layer                  │
│  (Database, S3, Vector DB, Cache)   │
└─────────────────────────────────────┘
       │
       v
┌─────────────┐
│ Flutter App │
│  (APK/IPA)  │
└─────────────┘
```
