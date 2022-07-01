import { verify } from 'jsonwebtoken'

export default async function authenticated (req, res) {
    try {
        verify(req.headers.authorization, process.env.JWT_SECRET, async function(err, decoded) {
            if(!err && decoded) {
                return await fn(req, res)
            }

            res.status(500).json({message: 'User not authenticated'})
        })        
    } catch (err) {
        console.log(err.stack)
        send(res, 500, 'Cant connect to the server.')
    }
}