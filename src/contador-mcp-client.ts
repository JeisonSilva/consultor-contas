import { Client } from "@modelcontextprotocol/sdk/client";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio";

export async function createMcpClient() {
    const transport = new StdioClientTransport({
        command: "node",
        args: ["./index.ts"],
    });

    const client = new Client({
        name: "Consultor Contas MCP Client",
        description: "Cliente MCP para análise de orçamentos imobiliários.",
        version: "1.0.0",
    })

    await client.connect(transport);

    console.log("Cliente conectado al servidor MCP...");

    return client;
}