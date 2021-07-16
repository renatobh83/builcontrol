import { getYear } from "date-fns";
import { addMonths, getMonth } from "date-fns/";
import Compras from "../../../../models/Compras";

class ComprasController {
  async create(params: any) {
    const {
      parcelas,
      data,
      valor,
      descr,
      categoria,
      formaPagamento,
      mes,
      ano,
      recorrente,
      user,
    } = params;
    try {
      if (parcelas && Number(parcelas) > 1) {
        const valorParcela = (parseFloat(valor) / Number(parcelas)).toFixed(2);
        let dataParcela;
        for (let i = 1; i < Number(parcelas); i++) {
          dataParcela = addMonths(new Date(data), i);
          const novoMes = getMonth(dataParcela).toString();

          const dataToSave = {
            parcelas,
            data: dataParcela,
            valor: valorParcela,
            descr,
            ano: getYear(dataParcela).toString(),
            categoria,
            formaPagamento,
            mes: novoMes,
            recorrente,
            user,
          };
          await Compras.create(dataToSave);
        }
        const dataToSave = {
          parcelas,
          data,
          ano,
          valor: valorParcela,
          descr,
          categoria,
          formaPagamento,
          mes,
          recorrente,
          user,
        };
        await Compras.create(dataToSave);
      } else {
        await Compras.create(params);
      }
      return "Ok";
    } catch (error) {
      return error;
    }
  }
  async findByAno(params: any) {
    const { user, ano } = params;
    console.log(params);
    const compras = await Compras.aggregate([
      {
        $match: { ano },
      },

      {
        $group: {
          _id: {
            mes: "$mes",
          },

          Compras: { $push: "$$ROOT" },
        },
      },
    ]);
    return compras;
  }
}

const comprasController = new ComprasController();
export { comprasController };
