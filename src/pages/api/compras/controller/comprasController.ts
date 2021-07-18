import { getYear } from "date-fns";
import { addMonths, getMonth } from "date-fns/";
import Compras from "../../../../models/Compras";

class ComprasController {
  async create(params: any) {
    let compra;
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
      // lancemento parcelado
      if (parcelas && Number(parcelas) > 1) {
        const valorParcela = (parseFloat(valor) / Number(parcelas)).toFixed(2);
        let dataParcela;
        // for parcelas
        for (let i = 1; i < Number(parcelas); i++) {
          // gera os meses
          dataParcela = addMonths(new Date(data), i);

          const dataToSave = {
            parcelas,
            data: dataParcela,
            valor: valorParcela,
            descr,
            ano: getYear(dataParcela).toString(),
            categoria,
            formaPagamento,
            mes: getMonth(dataParcela).toString(),
            recorrente,
            user,
          };
          compra = await Compras.create(dataToSave);
        } // Fim for das parcelas
        //  primeira pacela
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
        compra = await Compras.create(dataToSave);
      } else {
        // lancemento a vista
        compra = await Compras.create(params);
      }
      return compra;
    } catch (error) {
      throw new Error(error.messsage);
    }
  }
  async findByAno(params: any) {
    const { user, ano } = params;
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
