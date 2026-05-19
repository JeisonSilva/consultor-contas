import { Annotation, MessagesAnnotation } from "@langchain/langgraph";

type Imovel = {
    id: string;
    condominio: string;
    tipo_imovel: string;
    bairro: string;
    cidade: string;
    area_m2: number;
    quartos: number;
    banheiros: number;
    vagas_garagem: number;
    valor_imovel: number;
    taxa_condominio_mensal: number;
    iptu_anual: number;
    seguro_anual: number;
    manutencao_mensal: number;
    agua_mensal: number;
    energia_mensal: number;
    internet_mensal: number;
    total_custo_mensal: number;
    total_custo_anual: number;
}

const AgentState = Annotation.Root({
    ...MessagesAnnotation.spec,
    path: Annotation<string>(),
    orcamentos: Annotation<Imovel[]>({
        reducer: (atual, novo) => [...atual, ...novo],
        default: () => [],
    }),
    orcamentosFiltrados: Annotation<Imovel[]>({
        reducer: (atual, novo) => [...atual, ...novo],
        default: () => [],
    }),
    analise: Annotation<string>(),
})

export { AgentState, type Imovel }