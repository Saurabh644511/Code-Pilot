import userModel from "../../models/user.model.js";
import { sendAccessToken, sendTokens } from "../../utils/auth.util.js";
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

export const refreshToken = (req, res) => {
    const {refreshToken} = req.cookies;

    if(!refreshToken) {
        return customError(res, {}, 401, "Token is required");
    }

    try{
        const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        sendAccessToken(res, payload);
    } catch (error) {
        return customError(res, {}, 403, "Invalid refresh token");
    }
}

export const me = async(req, res) => {
    const user = await userModel.findById(req.user.userId).select("-password");
    return success(res, {user});
}