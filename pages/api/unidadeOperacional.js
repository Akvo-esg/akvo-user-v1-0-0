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
            unidName,
            setorPrimario,
            setorSecundario,
            cnpj,
            inscricaoEstadual,
            cep,
            logradouro,
            numero,
            cidade,
            estado,
            localizacao,
            user_id,
            responsavel_id,
            email,
            group,
            responsavelStatus,
            userStatus


        } = req.body

        if (!company_id, !unidName, !setorPrimario, !setorSecundario, !responsavel_id) {
            res.status(400).json({ error: 'Missing body parameter' })
            return
        }

        const { db } = await connect()

        const companyExists = await db.collection('companies').findOne({ _id: ObjectId(company_id) })
        if (!companyExists) {
            res.status(400).json({ error: 'Company not exists' })
        } else {
            const UnidExists = companyExists.unidades.find(e => e.unidName === unidName)


            if (!UnidExists) {
                const newUnid_id = ObjectId()
                const response = await db.collection('companies').updateOne(
                    { _id: ObjectId(company_id) },
                    {
                        $addToSet: {
                            "unidades":
                            {
                                "_id": newUnid_id,
                                "unidName": unidName,
                                "setorPrimario": setorPrimario,
                                "setorSecundario": setorSecundario,
                                "cnpj": cnpj || '',
                                "inscricaoEstadual": inscricaoEstadual || '',
                                "email": email,
                                "cep": cep || '',
                                "logradouro": logradouro || '',
                                "numero": numero || '',
                                "cidade": cidade || '',
                                "estado": estado || '',
                                "localizacao": localizacao || '',
                                "group": group,
                                "active": true,
                                "deleted": false,
                                "dateAdd": Date(),
                                "dateUpdated": '',
                                "addedBy": user_id,
                                "updatedBy": '',
                                "responsavel_id": responsavel_id,
                                "group": group || ''
                            }
                        }
                    })

                if (responsavelStatus === 'admLocal') {
                    await db.collection('users').updateOne(
                        { _id: ObjectId(responsavel_id) },
                        {
                            $push: { permissions: newUnid_id.toString() }
                        }
                    )
                }
                if (userStatus === 'admLocal' && userStatus !== responsavelStatus) {
                    await db.collection('users').updateOne(
                        { _id: ObjectId(userStatus) },
                        {
                            $push: { permissions: newUnid_id.toString() }
                        }
                    )
                }
                res.status(200).json(response)
            }
            else {
                res.status(400).json({ error: `Unidade Operacional ${unidName} já existe` })
            }
        }
    }

    else {
        res.status(400).json({ error: 'Wrong request method' })
    }


})