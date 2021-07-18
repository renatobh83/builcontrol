import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../utils/dbConnect";
import { receitaController } from "./contoller/receitaController";
dbConnect();
export default async (request: NextApiRequest, response: NextApiResponse) => {
  const { method } = request;

  switch (method) {
    case "POST":
      const receita = await receitaController.create(request.body);
      return response.status(200).json({ success: true, data: receita });
      break;
    case "GET":
      const receitas = await receitaController.loadReceita(request.query);
      return response.status(200).json({ success: true, data: receitas });
      break;

    default:
      break;
  }
};
