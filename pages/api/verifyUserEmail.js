import connect from '../../utils/database'

export default async function (req, res) {

    if (req.method === 'POST') {

        const { email } = req.body

        const { db } = await connect()

        const emailExists = await db.collection('users').findOne({ email: email })

        if (!emailExists) {
            res.status(200).json({ message: 'E-mail ok' })
        } else {
            res.status(400).json({ error: 'E-mail já cadastrado' })
        }
    } else {
        res.status(400).json({ error: "Wrong Request Method" })
    }
}