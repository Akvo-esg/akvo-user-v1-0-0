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

    if (req.method === 'PATCH') {

        const { newList, company_id } = req.body

        if (newList) {

            const { db } = await connect()


            const response = await db.collection('companies').updateOne(
                { _id: ObjectID(company_id) },
                {
                    $push: {
                        inventory: {
                            $each: newList,
                            $position: 0
                        }
                    }
                }
            )

            if (response) {
                res.status(200).json({ message: 'Inventory saved.' })
            } else {
                res.status(400).json({ error: 'Company does not exists' })
            }

        } else {
            res.status(400).json({ error: 'Missing paramter body.' })
        }
    }

    else if (req.method === "GET") {

        const body = req.query

        const { db } = await connect()

        const response = await db.collection('companies').findOne({ _id: ObjectID(body.company_id) })

        const inventory = response.inventory

        res.status(200).json(inventory.ops[0])
    }

})