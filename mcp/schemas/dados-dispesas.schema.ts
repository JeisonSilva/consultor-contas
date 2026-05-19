import z from "zod";

function dadosDespesasSchema() {
  return {
    path: z.string().describe("localização do arquivo de orçamento a ser analisado"),
    message: z.string().describe("mensagem do usuário relacionada à análise do orçamento")
  };
}

export { dadosDespesasSchema };