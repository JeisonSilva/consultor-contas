import { Client } from "@modelcontextprotocol/sdk/client";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio";

export async function createMcpClient() {
    const transport = new StdioClientTransport({
        command: "node",
        args: ["./index.ts"],
    });

    const client = new Client({
        name: "Contador MCP Client",
        description: "Un cliente que se comunica con el servidor MCP para contar números.",
        version: "1.0.0",
    })

    await client.connect(transport);

    console.log("Cliente conectado al servidor MCP...");

    return client;
}