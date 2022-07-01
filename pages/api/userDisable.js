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
            listUser_id,
            user_id,
            active
        } = req.body.data


        if (!listUser_id && !user_id) {
            res.status(400).json({ error: 'Missing body parameter' })
        } else {

            const { db } = await connect()

            const response = await db.collection('users').updateOne(
                { _id: ObjectId(listUser_id) },
                {
                    $set: {
                        "active": active,
                        "dateUpdated": Date(),
                        "updatedBy": user_id,
                    }
                })

            if (response) {
                res.status(200).json({ message: 'User disabled' })
            } else {
                res.status(400).json({ message: 'User not Exists' })
            }

        }
    }

    else {
        res.status(400).json({ error: 'Wrong request method' })
    }

}
)