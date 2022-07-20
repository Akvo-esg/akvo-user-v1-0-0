import { ObjectId } from 'bson'
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

    if (req.method === 'PATCH') {

        const {
            _id
        } = req.body

        const { db } = await connect()

        const response = await db.collection('users').updateOne(
            { _id: ObjectId(_id) },
            {
                $set: {
                    "dateLimit": false
                }
            })

        if (response) {
            res.status(200).json({ message: 'Unity disabled' })
        } else {
            res.status(400).json({ message: 'Unity not Exists' })
        }

    }
}


)