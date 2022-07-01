import connect from '../../utils/database'
import { ObjectID } from 'bson'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export default async function (req, res) {

    if (req.method === "PATCH") {

        const { userId, passwordRecoverToken, password } = req.body

        const { db } = await connect()

        const userExists = await db.collection('users').findOne({ _id: ObjectID(userId) })

        if (userExists) {
            const now = new Date()

            if (now.getTime() < userExists.passwordResetExpires.getTime()) {

                if (jwt.decode(passwordRecoverToken) === jwt.decode(userExists.passwordResetToken)) {

                    const saltPassword = await bcrypt.genSalt(10)
                    const securePassword = await bcrypt.hash(password, saltPassword)

                    await db.collection('users').updateOne({ _id: ObjectID(userId) },
                        {
                            $set: {
                                password: securePassword
                            }
                        })

                        res.status(200).json({ message: 'Password changed.'})

                } else {
                    res.status(404).json({error: 'Token time expires.'})
                }

            } else {
                console.log('nao foiii')
            }
        }


    } else {
        res.status(404).json({ error: 'Wrong request method.' })
    }
}