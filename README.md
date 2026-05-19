# consultor-contas

**MCP Real Estate Budget Analyst** — exposes an `analisar_orcamento` tool that reads property cost CSVs, filters the most relevant properties via a LangGraph planner–responder pipeline, and answers natural-language queries via OpenRouter.

---

## How it works

```
MCP tool: analisar_orcamento(path, message)
    └── LangGraph StateGraph
          ├── memory    → reads & parses the CSV into Imovel[]
          ├── planner   → LLM selects top-3 relevant properties (structured output)
          └── responder → LLM generates a natural-language recommendation
```

The MCP server is the external interface; the LangGraph graph is the internal reasoning engine. The model never receives the full CSV — the `planner` node filters it first, keeping context lean.

---

## MCP Tool

| Tool | Description |
|---|---|
| `analisar_orcamento` | Receives a CSV file path and a user question; returns a ranked property recommendation with cost breakdown. |

**Input schema:**
```json
{
  "path": "path to the CSV budget file",
  "message": "user's natural-language question"
}
```

---

## Graph flow

```
START → memory → planner → responder → END
```

| Node | Responsibility |
|---|---|
| `memory` | Reads the CSV and populates `orcamentos[]` in state |
| `planner` | Filters up to 3 properties most relevant to the question |
| `responder` | Produces a detailed, human-readable recommendation |

---

## CSV format

The input CSV must contain the following columns:

| Column | Type | Description |
|---|---|---|
| `id` | string | Property identifier |
| `condominio` | string | Condominium name |
| `tipo_imovel` | string | Property type (e.g. casa, apartamento) |
| `bairro` | string | Neighborhood |
| `cidade` | string | City |
| `area_m2` | number | Area in m² |
| `quartos` | number | Bedrooms |
| `banheiros` | number | Bathrooms |
| `vagas_garagem` | number | Parking spots |
| `valor_imovel` | number | Property value |
| `taxa_condominio_mensal` | number | Monthly condominium fee |
| `iptu_anual` | number | Annual IPTU tax |
| `seguro_anual` | number | Annual insurance |
| `manutencao_mensal` | number | Monthly maintenance |
| `agua_mensal` | number | Monthly water bill |
| `energia_mensal` | number | Monthly electricity bill |
| `internet_mensal` | number | Monthly internet bill |
| `total_custo_mensal` | number | Total monthly cost |
| `total_custo_anual` | number | Total annual cost |

A sample file is included at `data/orcamento_casas_condominio.csv`.

---

## Prerequisites

- Node.js 22+

---

## Installation

```bash
git clone https://github.com/JeisonSilva/consultor-contas.git
cd consultor-contas
npm install
```

---

## Configuration

```bash
cp .env-example .env
```

Edit `.env`:

```env
OPEN_LLM_KEY=your-openrouter-api-key
MODEL=nvidia/nemotron-3-nano-30b-a3b:free
TEMPERATURE=0.1
BASE_URL=https://openrouter.ai/api/v1
PATH_MEMORY=./data/orcamento_casas_condominio.csv
```

> Get your API key at [openrouter.ai/keys](https://openrouter.ai/keys)

---

## Claude Desktop configuration

Copy `claude_desktop_config.example.json` and merge it into your Claude Desktop config file:

**macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`  
**Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "consultor-contas": {
      "command": "node",
      "args": ["/absolute/path/to/consultor-contas/src/index.ts"]
    }
  }
}
```

---

## Typical session

```
You: Use consultor-contas to find the cheapest property in the dataset.

Claude: → analisar_orcamento({
            path: "./data/orcamento_casas_condominio.csv",
            message: "Qual a casa mais barata do condomínio?"
          })

  ## Recommendation

  The most affordable option is **Casa 03** in Bairro das Flores:
  - Monthly cost: R$ 2.840
  - Annual cost: R$ 34.080
  - 3 bedrooms · 2 bathrooms · 1 parking spot · 98 m²

  It has the lowest total monthly cost in the dataset, mainly due to
  a below-average condominium fee (R$ 450/month) and low IPTU.
```

---

## Project structure

```
consultor-contas/
├── src/
│   └── index.ts                    # Entry point — starts MCP server
├── mcp/
│   ├── server.ts                   # MCP server (StdioTransport)
│   ├── schemas/
│   │   └── dados-dispesas.schema.ts # Zod input schema for analisar_orcamento
│   └── tools/
│       └── dados-dispesas.tool.ts  # Tool registration + graph invocation
├── graph/
│   ├── index.ts                    # StateGraph definition
│   ├── state.ts                    # AgentState + Imovel type
│   └── nodes/
│       ├── memory.ts               # CSV reader node
│       ├── planner.ts              # Property filter node (structured output)
│       └── responder.ts            # Recommendation generator node
├── prompts/
│   ├── planner.prompt.ts           # Planner system prompt
│   └── responder.prompt.ts         # Responder system prompt
├── shared/
│   └── config/
│       └── env.ts                  # Environment variable loader
├── data/
│   └── orcamento_casas_condominio.csv  # Sample property dataset
├── .env-example
└── package.json
```

---

## Technologies

| Technology | Use |
|---|---|
| [LangGraph](https://langchain-ai.github.io/langgraphjs/) | Agent pipeline orchestration |
| [LangChain](https://js.langchain.com) | LLM integration and structured output |
| [MCP SDK](https://modelcontextprotocol.io) | MCP server (StdioTransport) |
| [OpenRouter](https://openrouter.ai) | LLM gateway (supports free models) |
| [csv-parse](https://csv.js.org/parse/) | CSV parsing |
| [Zod](https://zod.dev) | Input schema validation |
