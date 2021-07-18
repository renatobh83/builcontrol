import Receitas from "../../../../models/Receita";
interface ICreateReceita {
  data: string;
  valor: string;
  userId: string;
}

class ReceitaControoler {
  async create(params: ICreateReceita) {
    try {
      const receita = await Receitas.create(params);
      return receita;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async loadReceita(params: any) {
    try {
      console.log(params);
      const receitas = await Receitas.find(params);
      return receitas;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteReceita(id: string) {}
}

const receitaController = new ReceitaControoler();
export { receitaController };
