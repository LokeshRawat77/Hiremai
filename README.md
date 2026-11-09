# HireMai

## Run locally

Start the FastAPI backend from the repository root:

```powershell
uv run uvicorn main:app --reload
```

Set `GROQ_API_KEY` in the environment (or in a `.env` file at the repository root) before sending chat requests.

In another terminal, start the frontend:

```powershell
cd frontend
npm run dev
```

The Vite development server proxies `/chat` to the backend at `http://127.0.0.1:8000`.