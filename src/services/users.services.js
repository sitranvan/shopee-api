const UserModles = require('../models/User.modles')
const RefreshTokenModels = require('../models/RefreshToken.models')
const { userMessage } = require('../constants/message')
const { signAccessAndRefreshToken, decodeRefreshToken, signAccessToken, signRefreshToken } = require('../utils/jwt')

class UsersService {
    async register(body) {
        const user = await UserModles.create(body)
        // Gửi email xác thực tài khoản
        // Xóa mật khẩu trước khi gửi dữ liệu về client
        user.password = undefined
        return user
    }

    async login({ user_id, verify }) {
        const [access_token, refresh_token] = await signAccessAndRefreshToken({
            user_id,
            verify
        })
        const { iat, exp } = await decodeRefreshToken(refresh_token)
        await RefreshTokenModels.create({
            user_id,
            token: refresh_token,
            iat,
            exp
        })
        return {
            access_token,
            refresh_token
        }
    }

    async logout({ refresh_token }) {
        await RefreshTokenModels.deleteOne({
            token: refresh_token
        })
        return {
            message: userMessage.LOGOUT_SUCCESS
        }
    }
    async refreshToken({ user_id, refresh_token, verify, exp }) {
        const [new_access_token, new_refresh_token] = await Promise.all([
            signAccessToken({ user_id, verify }),
            signRefreshToken({ user_id, verify }),
            RefreshTokenModels.deleteOne({
                token: refresh_token,
                user_id
            })
        ])
        await RefreshTokenModels.create({
            user_id,
            token: new_refresh_token,
            iat: new Date(Date.now()),
            exp: new Date(Date.now() + exp * 1000)
        })
        return {
            access_token: new_access_token,
            refresh_token: new_refresh_token
        }
    }
}

const usersService = new UsersService()
module.exports = usersService
