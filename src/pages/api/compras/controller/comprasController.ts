import { getYear } from "date-fns";
import { addMonths, getMonth } from "date-fns/";
import Compras from "../../../../models/Compras";
import { v4 as uuid } from "uuid";
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
        let counter = 2;
        let compras = [];
        let compraParcela;
        const idCompra = uuid();
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
            numParcela: counter,
            ano: getYear(dataParcela).toString(),
            categoria,
            formaPagamento,
            mes: getMonth(dataParcela).toString(),
            recorrente,
            user,
            identifier: idCompra,
          };
          compraParcela = await Compras.create(dataToSave);
          compras.push(compraParcela);
          counter++;
        } // Fim for das parcelas
        //  primeira pacela
        const dataToSave = {
          parcelas,
          data,
          ano,
          numParcela: 1,
          valor: valorParcela,
          descr,
          categoria,
          formaPagamento,
          mes,
          recorrente,
          user,
          identifier: idCompra,
        };
        compraParcela = await Compras.create(dataToSave);

        compras.push(compraParcela);
        return compras;
      } else if (recorrente !== "") {
        let dataRecorrente;
        let compras = [];
        const idCompra = uuid();
        for (let i = 1; i < Number(recorrente); i++) {
          dataRecorrente = addMonths(new Date(data), i);
          const dataToSave = {
            parcelas,
            data: dataRecorrente,
            valor,
            descr,

            ano: getYear(dataRecorrente).toString(),
            categoria,
            formaPagamento,
            mes: getMonth(dataRecorrente).toString(),
            recorrente,
            user,
            identifier: idCompra,
          };
          compra = await Compras.create(dataToSave);
          compras.push(compra);
        }
        return compras;
      } else {
        // lancemento a vista
        compra = await Compras.create(params);
        compra.identifier = uuid();
        compra.save();
      }
      return compra;
    } catch (error) {
      throw new Error(error.messsage);
    }
  }
  async totalDespesa(params: any) {
    const { user, ano } = params;
    const compras = await Compras.aggregate([
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
  async deleteCompra(id: any) {
    const apagar = await Compras.deleteMany(id);
    return apagar.deletedCount;
  }
}

const comprasController = new ComprasController();
export { comprasController };
