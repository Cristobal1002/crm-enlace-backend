export const config = {
    host: '',
    jwt: process.env.JWT_SECRET
}

export const database = {
    name: process.env.DATABASE,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.HOST
}