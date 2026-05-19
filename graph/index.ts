import { END, START, StateGraph } from "@langchain/langgraph";
import { AgentState } from "./state.ts";
import { memory } from "./nodes/memory.ts";
import { planner } from "./nodes/planner.ts";
import { responder } from "./nodes/responder.ts";

const graph = new StateGraph(AgentState)
    .addNode("memory", memory)
    .addNode("planner", planner)
    .addNode("responder", responder)
    .addEdge(START, "memory")
    .addEdge("memory", "planner")
    .addEdge("planner", "responder")
    .addEdge("responder", END)
    .compile();

    export { graph }
