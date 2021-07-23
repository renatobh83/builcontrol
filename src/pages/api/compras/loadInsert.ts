import { NextApiRequest, NextApiResponse } from "next";
import Compras from "../../../models/Compras";
import CryptoCompras from "../../../models/CryptoCompras";
import { encrypt } from "../../../utils/crypto";
import dbConnect from "../../../utils/dbConnect";
import { receitaController } from "../receitas/contoller/receitaController";
import { comprasController } from "./controller/comprasController";
dbConnect();
export default async (request: NextApiRequest, response: NextApiResponse) => {
  const { method } = request;

  switch (method) {
    case "GET":
      try {
        const compras = await CryptoCompras.find(request.query);

        const receitas = await receitaController.loadReceita(request.query);
        const dataToRespose = {
          compras,
          receitas,
        };
        response.status(200).json({ success: true, data: dataToRespose });
      } catch (error) {
        response.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        const compra = await comprasController.create(request.body);

        return response.status(200).json({ success: true, data: compra });
      } catch (error) {
        response.status(400).json({ success: false });
      }
      break;
    case "DELETE":
      try {
        const compra = await comprasController.deleteCompra(request.query);
        return response.status(200).json({ success: true, data: compra });
      } catch (error) {
        response.status(400).json({ success: false });
      }
      break;
    default:
      response.status(400).json({ success: true });
      break;
  }
};
