import {LocalStorage} from "node-localstorage"
import { NextApiRequest, NextApiResponse } from 'next';
import Users from "../../../models/Users";

export default async (request: NextApiRequest, response: NextApiResponse) => {
    const localStorage = new LocalStorage("./scratch")
    const userId = localStorage.getItem("userLogin")
    const user = await Users.findOne({userId: userId})
    user.connected = false
    await user.save();
    localStorage.removeItem("userLogin")
    return  response.status(200).json({ success: true, data: "" })
}