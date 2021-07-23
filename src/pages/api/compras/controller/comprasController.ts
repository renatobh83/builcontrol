import { getYear } from "date-fns";
import { addMonths, getMonth } from "date-fns/";
import Compras from "../../../../models/Compras";
import CryptoCompras from "../../../../models/CryptoCompras";

import { v4 as uuid } from "uuid";
import { encrypt } from "../../../../utils/crypto";
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
          const dadoEnc = encryptDados(dataToSave);
          dadoEnc.identifier = idCompra;
          compraParcela = await CryptoCompras.create(dadoEnc);
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

        const dadoEnc = encryptDados(dataToSave);
        dadoEnc.identifier = idCompra;
        compraParcela = await CryptoCompras.create(dadoEnc);

        compras.push(compraParcela);
        return compras;
      } else if (recorrente === "6" || recorrente === "12") {
        let dataRecorrente;
        let compras = [];
        let compraRecorrente;
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
          const dadoEnc = encryptDados(dataToSave);
          dadoEnc.identifier = idCompra;
          compraRecorrente = await CryptoCompras.create(dadoEnc);
          compras.push(compraRecorrente);
        }
        return compras;
      } else {
        // lancemento a vista
        const idCompra = uuid();
        const dataToSave = {
          parcelas,
          data,
          ano,

          valor,
          descr,
          categoria,
          formaPagamento,
          mes,
          recorrente,
          user,
          identifier: idCompra,
        };
        const dadoEnc = encryptDados(dataToSave);
        dadoEnc.identifier = idCompra;
        let compra = await CryptoCompras.create(dadoEnc);

        compra.save();

        return compra;
      }
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
    const apagar = await CryptoCompras.deleteMany(id);
    return apagar.deletedCount;
  }
}

const comprasController = new ComprasController();
export { comprasController };

function encryptDados(params) {
  return encrypt(JSON.stringify(params), params.user);
}
