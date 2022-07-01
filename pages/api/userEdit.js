import { ObjectId } from 'bson'
import connect from '../../utils/database'
import { verify } from 'jsonwebtoken'
const mail = require('@sendgrid/mail')
import baseUrl from '../../utils/baseUrl'

mail.setApiKey(process.env.SENDGRIP_API_KEY_AKVO)


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

        const user_id = req.query.user_id


        if (!user_id) {
            res.status(400).json({ error: 'Missing body parameter' })
        } else {

            const { db } = await connect()

            const user = await db.collection('users').findOne({ _id: ObjectId(user_id) })
            const companyInfo = await db.collection('companies').findOne({ _id: ObjectId(user.company_id) })

            if (!companyInfo || !user) {
                res.status(400).json({ error: 'Company or user not exists' })
            } else {


                const userInfo = {
                    "firstName": user.firstName,
                    "lastName": user.lastName,
                    "active": user.active,
                    "userStatus": user.userStatus,
                    "userPermissions": user.permissions,
                    "userConfig": companyInfo.userConfig,
                    "profileImageUrl": user.profileImageUrl
                }

                let unitsInfo = []

                companyInfo.unidades.map(elem => {
                    unitsInfo.push({
                        "_id": elem._id,
                        "unidName": elem.unidName,
                        "group": elem.group,
                        "cidade": elem.cidade,
                        "estado": elem.estado,
                        "active": elem.active,
                        "deleted": elem.deleted,
                        "responsavel_id": elem.responsavel_id
                    })
                })

                res.status(200).json({
                    "userInfo": userInfo,
                    "unitsInfo": unitsInfo
                })
            }
        }
    }

    else if (req.method === 'PATCH') {

        const {
            _id,
            userStatus,
            permissions,
            user_id,
            userConfig
        } = req.body

        // console.log(req.body)

        if (!_id || !userStatus || !permissions || !user_id) {
            res.status(400).json({ error: 'Missing body parameter' })
        } else {

            const { db } = await connect()

            let response = ''

            if (userStatus === "admGlobal") {

                response = await db.collection('users').updateOne({
                    _id: ObjectId(_id)
                }, {
                    $set: {
                        "userStatus": userStatus,
                        "permissions": false
                    }
                })
            } else {

                response = await db.collection('users').updateOne({
                    _id: ObjectId(_id)
                }, {
                    $set: {
                        "userStatus": userStatus,
                        "permissions": permissions
                    }
                })
            }

            if (response) {
                res.status(200).json({ message: "Usuário atualizado com sucesso" })
            } else {
                res.status(400).json({ error: "Erro ao atualizar o usuário." })
            }
        }
    }

    else {
        res.status(400).json({ error: 'Wrong request method' })
    }

})