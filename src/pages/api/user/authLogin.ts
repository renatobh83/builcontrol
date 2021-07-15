import { NextApiRequest, NextApiResponse } from "next";
import Users from "../../../models/Users";
import Bcrypt from "bcryptjs"
import {LocalStorage} from "node-localstorage"
import dbConnect from "../../../utils/dbConnect";
import Compras from "../../../models/Compras";

dbConnect()
export default async (request: NextApiRequest, response: NextApiResponse) => {
    const { method } = request
    
    if(method !== "POST"){
        return response.status(400).json({ success: false, message: 'Only POST requests are allowed.' })
    }
    try {
        const { email , senha} = request.body
        const localStorage = new LocalStorage("./scratch")
        const password = Bcrypt.hashSync(senha, 10)
        const data = {email, password}
        let user = await Users.findOne({email})
       
        if(!user) {
            user =  await Users.create(data)
            user.connected = true
            await user.save();
            localStorage.setItem("userLogin", user.userId)
            return  response.status(200).json({ success: true, data: user })
        }
            const match = await Bcrypt.compareSync(senha, user.password)     
            if(match) {
                localStorage.setItem("userLogin", user.userId)
                user.connected = true
                await user.save();
                const comprasForUser = await Compras.find({user: user._id})
                const dataForResponse = {
                    user,
                    comprasForUser
                }


                return response.status(200).json({ success: true, data: dataForResponse })
            } else {
                return response.status(401).json({ success: true, data: "Senha incorreta" })
            }
    } catch (error) {
        console.log(error)
        response.status(400).json({ success: false });
    }
}