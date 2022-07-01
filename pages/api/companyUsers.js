import { ObjectID } from 'bson'
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

    if (req.method === 'GET') {

        const { company_id } = req.query

        // console.log(company_id)

        if (!company_id) {
            res.status(400).json({ error: "Missing body parameter." })
        } else {

            const { db } = await connect()

            const companyExists = await db.collection('companies').findOne({ _id: ObjectID(company_id) })

            const response = await db.collection('users').find(
                { company_id: { $eq: company_id } }
            ).toArray()

            if (!response) {
                res.status(400).json({ error: "Users not found." })
                return
            } else {
                const usersInfo = []

                response.map(elem => {
                    const responsavelUnits = []
                    companyExists.unidades.map(elem2 => {
                        if (elem2.responsavel_id === elem._id.toString()) {
                            responsavelUnits.push({
                                _id: elem2._id.toString(),
                                unidName: elem2.unidName
                            })
                        }
                    })

                    // console.log(responsavelUnits)

                    usersInfo.push({
                        _id: elem._id,
                        firstName: elem.firstName,
                        lastName: elem.lastName,
                        email: elem.email,
                        celular: elem.celular,
                        profileImageUrl: elem.profileImageUrl,
                        userStatus: elem.userStatus,
                        cidade: elem.cidade,
                        estado: elem.estado,
                        active: elem.active,
                        deleted: elem.deleted,
                        permissions: elem.permissions,
                        responsavelUnits: responsavelUnits
                    })
                })

                const companyInfo = {
                    "userConfig": companyExists.userConfig
                }
                res.status(200).json({
                    "usersInfo": usersInfo,
                    "companyInfo": companyInfo.userConfig
                })
            }


        }
    }
}
)