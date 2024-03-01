require('dotenv').config()

exports.env = {
    port: process.env.PORT,
    dbUsername: process.env.DB_USERNAME,
    dbPassword: process.env.DB_PASSWORD,
    dbName: process.env.DB_NAME,

    dbCollectionUsers: process.env.DB_COLLECTION_USERS,

    jwtAccessTokenSecret: process.env.JWT_ACCESS_TOKEN_SECRET,
    jwtRefreshTokenSecret: process.env.JWT_REFRESH_TOKEN_SECRET,
    jwtExpireIn: process.env.JWT_EXPIRE_IN
}
