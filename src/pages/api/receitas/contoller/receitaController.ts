import Receitas from "../../../../models/Receita";
import ReceitaCrypto from "../../../../models/CryptoReceitas";
import { encrypt } from "../../../../utils/crypto";

interface ICreateReceita {
  data: string;
  valor: string;
  userId: string;
}

class ReceitaControoler {
  async create(params: ICreateReceita) {
    try {
      const data = encrypt(JSON.stringify(params), params.user);
      const receita = await ReceitaCrypto.create(data);
      return receita;
      // const receita = await Receitas.create(params);
      // return receita;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async loadReceita(params: any) {
    try {
      const receitas = await ReceitaCrypto.find(params);
      // console.log(receita  s);
      // const receitas = await Receitas.find(params);
      return receitas;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async totalReceita(params: any) {
    const { user } = params;
    const compras = await Receitas.aggregate([
      {
        $match: { user },
      },

      {
        $group: {
          _id: {
            ano: "$ano",
            mes: "$mes",
          },

          totalComprasMes: { $sum: "$valor" },
        },
      },
    ]);
    return compras;
  }

  async deleteReceita(id: any) {
    const apagar = await Receitas.deleteOne(id);
    return apagar.deletedCount;
  }
}

const receitaController = new ReceitaControoler();
export { receitaController };
