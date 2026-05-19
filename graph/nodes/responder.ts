import { ChatOpenAI } from "@langchain/openai";
import type { AgentState } from "../state.ts";
import CONFIG from "../../shared/config/env.ts";
import { AIMessage, SystemMessage } from "@langchain/core/messages";
import { responderPrompt } from "../../prompts/responder.prompt.ts";




const model = new ChatOpenAI({
    openAIApiKey: CONFIG.OPEN_LLM_KEY,
    modelName: CONFIG.MODEL ?? "",
    temperature: parseFloat(CONFIG.TEMPERATURE ?? "0.1"),
    configuration: {
        baseURL: CONFIG.BASE_URL,
    },
})

async function responder(state: typeof AgentState.State) {
    const contexto = new SystemMessage(responderPrompt(state.orcamentosFiltrados));
        

    const resposta = await model.invoke([contexto,...state.messages]);
    return {analise:[new AIMessage(resposta.content)]};
}

export { responder }