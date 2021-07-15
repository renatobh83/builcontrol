import dbConnect from '../../../utils/dbConnect';
import { NextApiRequest, NextApiResponse } from 'next';
import Users from '../../../models/Users';
import {LocalStorage} from "node-localstorage"

dbConnect()

const handler = async (request: NextApiRequest, response: NextApiResponse)=>{
    const localStorage = new LocalStorage("./scratch")
    const userLogin = localStorage.getItem("userLogin")
    if(!userLogin){
        return response.status(401).json({ success: false, message: 'Voce deve estar logado.' })
    } else {
        const user = await Users.findOne({userId: userLogin})
        return response.status(200).json({ success: true, message: user.connected })
    }
}
export default handler;