//import "dotenv/config";
import startServer from "../mcp/server.ts";

import { HumanMessage } from "@langchain/core/messages";
import { graph } from "../graph/index.ts";

await startServer();

//const contexto = new HumanMessage("Qual a casa mais barata do condominio?")
//const result = await graph.invoke({
//    messages: [contexto], 
//    path: "/home/jeison/projetos/mcps/consultor-contas/data/orcamento_casas_condominio.csv", 
//    orcamentos: []});
//
//console.log(result)