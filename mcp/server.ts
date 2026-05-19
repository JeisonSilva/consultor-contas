import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { configureToolDadosDespesas } from "./tools/dados-dispesas.tool.ts";

async function startServer() {
    const server = new McpServer({
        name: "analista-de-orcamentos",
        version: "0.1.0",
        description: "Servidor para análise de orçamentos",
    })

    configureToolDadosDespesas(server);

    const transport = new StdioServerTransport();
    await server.connect(transport);


}

export default startServer;