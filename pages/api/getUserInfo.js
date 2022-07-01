import { ObjectID } from 'bson'
import connect from '../../utils/database'
import { verify } from 'jsonwebtoken'
import { left } from '@popperjs/core'

const authenticated = fn => async (req, res) => {

    verify(req.cookies.auth, process.env.JWT_SECRET, async function (err, decoded) {
        if (!err && decoded) {
            return await fn(req, res)
        }

        res.status(500).json({ message: 'You are not authenticated.' })
    })
}

// export default authenticated(async (req, res) => {
export default async (req, res) => {

    if (req.method === 'POST') {

        const { _id } = req.body

        if (!_id) {
            res.status(400).json({ error: "Missing body paramterrrrr." })
        } else {
            const { db } = await connect()

            const userData = await db.collection('users').findOne(
                { _id: ObjectID(_id) },
                { password: 0 }
            )


            if (!userData) {
                res.status(400).json({ error: "User not found." })
                return
            } else {

                let companyData = 0

                if (userData.company_id) {
                    companyData = await db.collection('companies').findOne({ _id: ObjectID(userData.company_id) })
                }

                let notifications = {
                    perfilNot: true,
                    cadastroInst: true,
                    firstUnity: true,
                    tutorial: true,
                    freeAccount: '',
                }

                const dateNow = Date.now()
                const dateLimit = userData.dateLimit ? userData.dateLimit.getTime() : null

                if (userData.firstName &&
                    userData.lastName &&
                    userData.cpf &&
                    userData.celular &&
                    userData.cep &&
                    userData.logradouro &&
                    userData.numero &&
                    userData.cidade &&
                    userData.estado) {
                    notifications.perfilNot = false
                }
                if (userData.company_id) {
                    notifications.cadastroInst = false
                }

                if (companyData.unidades && companyData.unidades.length > 0) {
                    notifications.firstUnity = false
                }
                if (userData.accessCount > 5) {
                    notifications.tutorial = false
                }
                if (dateNow < dateLimit) {
                    notifications.freeAccount = Math.trunc((dateLimit - dateNow) / 86400000)
                }

                res.status(200).json({ notifications })

            }
        }
    }

    else {
        res.status(400).json({ error: 'Wrong method.' })
    }
}