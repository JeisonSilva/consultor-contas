import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import { dadosDespesasSchema } from "../schemas/dados-dispesas.schema.ts";
import { graph } from "../../graph/index.ts";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";

export async function configureToolDadosDespesas(server: McpServer){
    server.registerTool(
        "analisar_orcamento",{
            title: "Analisar Orçamento",
            description: "Ferramenta para analisar orçamentos e fornecer insights",
            inputSchema: dadosDespesasSchema()
        },
        async ({path, message}) => {
            const contexto = new HumanMessage(message)
            const result = await graph.invoke({messages: [contexto], path: path});

            return {
                content:[
                    {
                        type: "text",
                        text: JSON.stringify({message: result.analise, orcamentos: []})
                    }
                ]
            }
        }
    );
}