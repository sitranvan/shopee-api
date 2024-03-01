const { userMessage } = require('../constants/message')
const RefreshTokenModels = require('../models/RefreshToken.models')
const UserModles = require('../models/User.modles')
const { hashPassword } = require('../utils/crypto')
const { signAccessAndRefreshToken, decodeRefreshToken } = require('../utils/jwt')

const registerController = async (req, res) => {
    const { email, password } = req.body

    const user = await UserModles.create({
        email,
        password: hashPassword(password)
    })

    // Gửi email xác thực tài khoản

    // Xóa mật khẩu trước khi gửi dữ liệu về client
    user.password = undefined
    return res.json({
        message: userMessage.REGISTER_SUCCESS,
        data: user
    })
}

const loginController = async (req, res) => {
    const { user } = req
    const [access_token, refresh_token] = await signAccessAndRefreshToken({
        user_id: user._id.toString(),
        verify: user.isVerified
    })
    const { user_id, iat, exp } = await decodeRefreshToken(refresh_token)
    await RefreshTokenModels.create({
        user_id,
        token: refresh_token,
        iat: new Date(iat * 1000),
        exp: new Date(exp * 1000)
    })

    return res.json({
        message: userMessage.LOGIN_SUCCESS,
        data: {
            access_token,
            refresh_token
        }
    })
}

module.exports = {
    registerController,
    loginController
}
