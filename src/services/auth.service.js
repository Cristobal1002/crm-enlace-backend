import {model} from "../models/main.model.js";
import bcrypt from 'bcryptjs';
import {CustomError} from "../errors/main.error.js";
import {jwt} from "../utils/main.util.js";

export const login = async (data) => {
    const {user, password} = data
    try{
        let valHash
        const usr = await model.UserModel.findOne({where:{document: user}});
        if(usr){
             valHash = await bcrypt.compare(password, usr.password)
        }
        if(!usr || !valHash) return {error: `User or Password invalid`}
        else {
            const signToken = await jwt.getToken(usr.id)
            return {data: {user: usr, token: signToken}, error: null, warning: null}
        }
    } catch (e){
        console.log('error en login',e)
        throw CustomError({message:'error', code: 500, data:error.data})
    }
}