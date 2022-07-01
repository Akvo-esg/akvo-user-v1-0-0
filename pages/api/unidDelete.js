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
            company_id,
            unid_id,
            user_id,
            deleted
        } = req.body.data

        // console.log(req.body.data)

        if (!company_id && !unid_id && !user_id) {
            res.status(400).json({ error: 'Missing body parameter' })
        } else {

            const { db } = await connect()


            const companyExists = await db.collection('companies').findOne({ _id: ObjectId(company_id) })
            if (!companyExists) {
                res.status(400).json({ error: 'Company not exists' })
            } else {

                const unidExists = companyExists.unidades.find(elem => elem._id.toString() === unid_id)

                if (unidExists && unidExists.active === false) {

                    const response = await db.collection('companies').updateOne(
                        { _id: ObjectId(company_id), "unidades._id": ObjectId(unid_id) },
                        {
                            $set: {
                                "unidades.$.deleted": deleted,
                                "unidades.$.dateUpdated": Date(),
                                "unidades.$.updatedBy": user_id,
                            }
                        })

                    if (response) {
                        res.status(200).json({ message: 'Unity deleted' })
                    } else {
                        res.status(400).json({ message: 'Unity cant be deleted' })
                    }
                } else {
                    res.status(400).json({ message: 'Unity not Exists' })
                }

            }
        }
    }

    else {
        res.status(400).json({ error: 'Wrong request method' })
    }

}
)