# PDF AI Assistant

An AI-powered PDF Question Answering system built using Next.js, ChromaDB, Hugging Face Inference API, and Retrieval-Augmented Generation (RAG).

Users can upload PDF documents, generate embeddings, store them in a vector database, and ask natural language questions to retrieve context-aware answers from the uploaded documents.

---

## Features

- Upload PDF documents
- Extract text from PDFs
- Chunk large documents into smaller sections
- Generate embeddings using Hugging Face
- Store embeddings in ChromaDB
- Semantic similarity search
- AI-generated answers using LLMs
- Source-aware retrieval pipeline
- Modern chat-based UI
- Dockerized deployment support

---

## Tech Stack

### Frontend
- Next.js 16
- React 19
- Tailwind CSS

### Backend
- Next.js API Routes
- Node.js

### AI & RAG
- Hugging Face Inference API
- ChromaDB Vector Database
- Semantic Search
- Retrieval-Augmented Generation (RAG)

### PDF Processing
- pdf-parse

### DevOps
- Docker
- Docker Compose

---

## Project Architecture

```text
User Question
       │
       ▼
Next.js API Route
       │
       ▼
Generate Query Embedding
       │
       ▼
ChromaDB Similarity Search
       │
       ▼
Relevant PDF Chunks Retrieved
       │
       ▼
LLM Prompt Construction
       │
       ▼
Hugging Face LLM
       │
       ▼
Final Answer Returned
```

---

## Folder Structure

```text
pdf-ai-assistant/
│
├── app/
│   ├── api/
│   │   ├── upload/
│   │   └── query/
│   │
│   └── chat/
│
├── lib/
│   ├── chromadb.js
│   ├── embedding.js
│   ├── pdfParser.js
│   ├── chunker.js
│   └── llm.js
│
├── services/
│   ├── ingestService.js
│   └── queryService.js
│
├── Dockerfile
├── docker-compose.yml
├── package.json
└── README.md
```

---

## Installation

### Clone Repository

```bash
git clone <repository-url>
cd pdf-ai-assistant
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env.local` file:

```env
HF_TOKEN=your_huggingface_token
CHROMA_HOST=localhost
```

---

## Running Locally

Start ChromaDB:

```bash
docker run -p 8000:8000 chromadb/chroma
```

Run application:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## Docker Deployment

Build image:

```bash
docker build -t pdf-ai-assistant .
```

Run:

```bash
docker run -p 3000:3000 pdf-ai-assistant
```

Or use Docker Compose:

```bash
docker compose up --build
```

---

## API Endpoints

### Upload PDF

```http
POST /api/upload
```

Uploads a PDF and stores embeddings in ChromaDB.

### Query PDF

```http
POST /api/query
```

Request:

```json
{
  "question": "What skills does Akash have?"
}
```

Response:

```json
{
  "answer": "...",
  "sources": []
}
```

---

## How It Works

### Document Ingestion Pipeline

1. Upload PDF
2. Extract text
3. Create chunks
4. Generate embeddings
5. Store vectors in ChromaDB

### Query Pipeline

1. User submits question
2. Generate query embedding
3. Search nearest vectors
4. Retrieve relevant chunks
5. Build context
6. Generate final answer using LLM

---

## Future Improvements

- Multi-PDF support
- PDF source citations
- Streaming AI responses
- Authentication
- Chat history
- User workspaces
- Hybrid Search (BM25 + Vector Search)
- OpenAI/Gemini support
- Production deployment on AWS

---

## Learning Outcomes

Through this project I learned:

- Retrieval-Augmented Generation (RAG)
- Vector Databases
- Embeddings
- Semantic Search
- Next.js API Development
- ChromaDB
- Hugging Face Inference API
- Docker & Containerization
- Full-Stack AI Application Development

---

## Author

Akash Sharma
