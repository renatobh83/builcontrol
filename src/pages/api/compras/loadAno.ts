import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../utils/dbConnect";
import { comprasController } from "./controller/comprasController";

dbConnect();
export default async (request: NextApiRequest, response: NextApiResponse) => {
  const compra = await comprasController.findByAno(request.query);
  console.log(request.query);
  return response.status(200).json({ success: true, data: compra });
};
