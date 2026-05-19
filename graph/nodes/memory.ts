import type { AgentState, Imovel } from "../state.ts";
import fs from "fs/promises";
import { parse } from "csv-parse/sync";



async function memory(state: typeof AgentState.State) {
    const raw = await fs.readFile(state.path, "utf-8");
    const linhas = parse(raw, {
        columns: true,
        skip_empty_lines: true,
        cast: true,
    });


    const orcamentos: Array<Imovel> = [];
    for (const linha of linhas as Array<Record<string, string>>) {
        const orcamento: Imovel = {
            id: linha["id"] ?? "",
            condominio: linha["condominio"] ?? "",
            tipo_imovel: linha["tipo_imovel"] ?? "",
            bairro: linha["bairro"] ?? "",
            cidade: linha["cidade"] ?? "",
            area_m2: parseFloat(linha["area_m2"] ?? "0"),
            quartos: parseInt(linha["quartos"] ?? "0"),
            banheiros: parseInt(linha["banheiros"] ?? "0"),
            vagas_garagem: parseInt(linha["vagas_garagem"] ?? "0"),
            valor_imovel: parseFloat(linha["valor_imovel"] ?? "0"),
            taxa_condominio_mensal: parseFloat(linha["taxa_condominio_mensal"] ?? "0"),
            iptu_anual: parseFloat(linha["iptu_anual"] ?? "0"),
            seguro_anual: parseFloat(linha["seguro_anual"] ?? "0"),
            manutencao_mensal: parseFloat(linha["manutencao_mensal"] ?? "0"),
            agua_mensal: parseFloat(linha["agua_mensal"] ?? "0"),
            energia_mensal: parseFloat(linha["energia_mensal"] ?? "0"),
            internet_mensal: parseFloat(linha["internet_mensal"] ?? "0"),
            total_custo_mensal: parseFloat(linha["total_custo_mensal"] ?? "0"),
            total_custo_anual: parseFloat(linha["total_custo_anual"] ?? "0"),
        }
        orcamentos.push(orcamento);
    }

    return {orcamentos: orcamentos};
}

export { memory }