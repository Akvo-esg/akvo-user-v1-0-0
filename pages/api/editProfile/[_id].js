import connect from '../../../utils/database'
import { verify } from 'jsonwebtoken'
import { ObjectId, ObjectID } from 'bson'

const authenticated = fn => async (req, res) => {
    verify(req.cookies.auth, process.env.JWT_SECRET, async function (err, decoded) {
        if (!err && decoded) {
            return await fn(req, res)
        }
        res.status(500).json({ message: 'You are not authenticated.' })
    })
}

export default authenticated(async (req, res) => {
    // export default async function (req, res) {

    const user_id = req.query._id

    if (req.method === 'GET') {

        const { db } = await connect()

        const response = await db.collection('users').findOne(
            { _id: ObjectID(user_id) },
            { _id: 0, password: 0, permissions: 0, adm: 0, company_id: 0 }
        )

        if (!response) {
            res.status(400).json({ error: 'User do not exists.' })
        } else {
            res.status(200).json(response)
        }
    }

    else if (req.method === 'PATCH') {

        const updateObject = req.body

        const { db } = await connect()

        await db.collection('users').updateOne(
            { _id: ObjectId(user_id) },
            {
                $set: updateObject
            })
        res.status(200).json({ message: 'Profile Updated.' })

    }

    else {
        res.status(400).json({ error: 'Wrong request method.' })
    }

})