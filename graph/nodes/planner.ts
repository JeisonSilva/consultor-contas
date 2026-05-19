import { ChatOpenAI } from "@langchain/openai";
import CONFIG from "../../shared/config/env.ts";
import type { AgentState } from "../state.ts";
import z from "zod";
import { SystemMessage } from "@langchain/core/messages";
import { plannerPrompt } from "../../prompts/planner.prompt.ts";

const schema = z.object({
    imoveis: z.array(
        z.object({
            id: z.string(),
            condominio: z.string(),
            tipo_imovel: z.string(),
            area_m2: z.number(),
            quartos: z.number(),
            banheiros: z.number(),
            vagas_garagem: z.number(),
            total_custo_mensal: z.number(),
            total_custo_anual: z.number(),
        })
    ).max(3),
    router: z.string().describe("routeia para executor ou RESPONDER quando a pergunta não precisa do EXECUTOR"),
});


const model = new ChatOpenAI({
    openAIApiKey: CONFIG.OPEN_LLM_KEY,
    modelName: CONFIG.MODEL ?? "",
    temperature: parseFloat(CONFIG.TEMPERATURE ?? "0.1"),    
    configuration: {
        baseURL: CONFIG.BASE_URL,
    },
})

async function planner(state: typeof AgentState.State) {
    
    const contexto = new SystemMessage(plannerPrompt(state.orcamentos));

    const resposta = await model.withStructuredOutput(schema).invoke([contexto, ...state.messages]);
    return { orcamentosFiltrados: resposta.imoveis };
}

export { planner }