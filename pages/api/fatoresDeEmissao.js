import { ObjectId, ObjectID } from 'bson'
import connect from '../../utils/database'
import { verify } from 'jsonwebtoken'

const authenticated = fn => async (req, res) => {

    verify(req.cookies.auth, process.env.JWT_SECRET, async function (err, decoded) {
        if (!err && decoded) {
            return await fn(req, res)
        }

        res.status(500).json({ message: 'You are not authenticated.' })
    })
}

export default authenticated(async (req, res) => {

    if (req.method === "GET") {

        const { db } = await connect()

        const response = await db.collection('fatoresEmissao').find().toArray()

        if (response) {

            res.status(200).json(response)

        } else {

            res.status(200).json({ err: 'Fator de emissão inválido' })

        }


    }

})