require('dotenv').config()

exports.env = {
    port: process.env.PORT,
    dbUsername: process.env.DB_USERNAME,
    dbPassword: process.env.DB_PASSWORD,
    dbName: process.env.DB_NAME,

    dbCollectionUsers: process.env.DB_COLLECTION_USERS
}
