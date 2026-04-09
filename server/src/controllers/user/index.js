import userModel from "../../models/user.model.js";
import { sendTokens } from "../../utils/auth.util.js";
import { badRequest, customError } from "../../utils/response.util.js";

export const register = async (req, res) => {
    const user = await userModel.create({...req.body});
    sendTokens(user, 201, res);
}

export const login = async (req, res) => {
    const {email, password} = req.body;

    if(!email || !password) {
        return badRequest(res, {}, "Please provide email and password")
    }

    const user = await userModel.findOne({email});
    console.log(user)

    if(!user) {
        return customError(res, {}, 401, "Invalid credentials")
    }
    
    const isPasswordCorrect = await user.comparePassword(password)

    console.log(password)
    console.log(user.password)

    if(!isPasswordCorrect) {
        return customError(res, {}, 401, "Invalid credentials")
    }

    sendTokens(user, 200, res)

}