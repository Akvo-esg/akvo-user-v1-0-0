import { ObjectID } from 'bson'
import connect from '../../../utils/database'
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

    const id = req.query._id

    if (req.method === "PATCH") {

        const updateObject = req.body

        const { db } = await connect()

        await db.collection('companies').updateOne(
            { _id: ObjectID(id), "inventory.code": updateObject.code },
            {
                $set: { "inventory.$": updateObject }
            })
        res.status(200).json({ message: 'Inventory updated.' })
    }

    else if (req.method === "POST") {

        const body = req.body

        const { db } = await connect()

        await db.collection('companies').updateOne(
            { _id: ObjectID(id) },
            {
                $pull: { 'inventory': { code: body.code } }
            }
        )
        res.status(200).json({ message: 'Item deleted.' })
    }

    else {
        res.status(400).json({ message: 'Wrong request method.' })
    }

}
)
