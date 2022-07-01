const mail = require('@sendgrid/mail')
import { ObjectId } from 'bson'
import connect from '../../utils/database'
import { verify } from 'jsonwebtoken'
import bcrypt from 'bcrypt'


mail.setApiKey(process.env.SENDGRID_API_KEY)

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

        const { user_id, newPassword, oldPassword } = req.body

        const { db } = await connect()

        const userExists = await db.collection('users').findOne({ _id: ObjectId(user_id) })

        if (userExists) {

            bcrypt.compare(oldPassword, userExists.password, async function (err, result) {
                if (!err && result) {

                    const saltPassword = await bcrypt.genSalt(10)
                    const securePassword = await bcrypt.hash(newPassword, saltPassword)

                    await db.collection('users').updateOne({ _id: ObjectId(user_id) },
                        {
                            $set: { "password": securePassword }
                        }
                    )

                    res.status(200).json({ message: "Password changed." })

                } else {
                    res.status(400).json({ error: 'Wrong password.' })
                }
            })

        } else {
            res.status(400).json({ error: "User dont exists." })
        }
    }    
    
    else {
        res.status(400).json({ error: "Wrong request method." })
    }


})