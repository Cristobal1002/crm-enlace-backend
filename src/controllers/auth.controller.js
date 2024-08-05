import { responses } from '../network/main.network.js'

export const test = async (req, res, next) => {
    const data = req.body
    try {
        res.send(data)
    } catch (e) {
        next(e)
    }
}