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

    if (req.method === "PATCH") {

        const updateObject = req.body

        const { db } = await connect()

        await db.collection('companies').updateOne(
            { _id: ObjectID(updateObject.company_id), "inventory.code": updateObject.code },
            {
                $set: {
                    "inventory.$.descricaoFonte": updateObject.descricaoFonte,
                    "inventory.$.qtd": updateObject.qtd,
                    "inventory.$.unidade": updateObject.unidade,
                    "inventory.$.comentario": updateObject.comentario,
                    "inventory.$.combustivel": updateObject.combustivel,
                    "inventory.$.combustivelName": updateObject.combustivelName,
                    "inventory.$.comentario": updateObject.comentario,
                    "inventory.$.emissoesCO2_F": updateObject.emissoesCO2_F,
                    "inventory.$.emissoesCH4_F": updateObject.emissoesCH4_F,
                    "inventory.$.emissoesN2O_F": updateObject.emissoesN2O_F,
                    "inventory.$.emissoesCO2_B": updateObject.emissoesCO2_B,
                    "inventory.$.emissoesCH4_B": updateObject.emissoesCH4_B,
                    "inventory.$.emissoesN2O_B": updateObject.emissoesN2O_B,
                    "inventory.$.emissoesTotais": updateObject.emissoesTotais,
                    "inventory.$.emissoesBiogenicas": updateObject.emissoesBiogenicas,
                    "inventory.$.userName": updateObject.userName,
                    "inventory.$.user_id": updateObject.user_id,
                    "inventory.$.dateUpdated": updateObject.dateUpdated,
                }
            })
        res.status(200).json({ message: 'Inventory updated.' })

    }

    else if (req.method === "POST") {

        const body = req.body

        const { db } = await connect()

        await db.collection('companies').updateOne(
            { _id: ObjectID(body.company_id) },
            {
                $pull: { 'inventory': { code: body.code } }
            }
        )
        res.status(200).json({ message: 'Item deleted.' })
    }


}
)
