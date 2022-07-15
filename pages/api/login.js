import bcrypt from 'bcrypt'
import connect from '../../utils/database'
import { ObjectID } from 'bson'
import { sign } from 'jsonwebtoken'
import cookie from 'cookie'


export default async (req, res) => {

    if (req.method === 'POST') {

        const { email, password } = req.body

        const { db } = await connect()

        const person = await db.collection('users').findOne({ email })

        let userConfig
        let companyLogo

        if (!person) {
            res.status(400).json({ error: 'Wrong e-mail or password.' })
        } else {

            if (person.company_id) {
                const company = await db.collection('companies').findOne(ObjectID(person.company_id))
                userConfig = company.userConfig
                companyLogo = company.profileImageUrl
            }

            bcrypt.compare(password, person.password, async function (err, result) {
                if (!err && result) {

                    if (person.active && (!person.dateLimit || person.dateLimit.toJSON().slice(0, 10) > new Date().toJSON().slice(0, 10))) {
                        const clains = {
                            sub: person._id,
                            firstName: person.firstName,
                            lastName: person.lastName,
                            company_id: person.company_id,
                            profilePicture: person.profileImageUrl,
                            permissions: person.permissions,
                            userStatus: person.userStatus,
                            dateLimit: person.dateLimit,
                            userConfig: userConfig,
                            // aleatory coment
                            companyLogo: companyLogo ? companyLogo : '',
                            active: person.active
                        }

                        const jwt = sign(clains, process.env.JWT_SECRET, {})

                        const response = res.setHeader('Set-Cookie', cookie.serialize('auth', jwt, {
                            httpOnly: false,
                            secure: process.env.NODE_ENV !== true, //em produção usar true
                            sameSite: 'strict',
                            path: '/'
                        }))

                        await db.collection('users').updateOne({ _id: ObjectID(person._id) },
                            {
                                $inc: {
                                    accessCount: 1
                                }
                            })

                        res.status(200).json({ message: 'Ok' })
                    } else {

                        await db.collection('users').updateOne(
                            { "_id": ObjectID(person._id) },
                            {
                                $set: { "active": false }
                            })
                        res.status(404).json({ error: 'conta expirou.' })
                    }

                } else {
                    res.status(400).json({ error: 'Wrong e-mail or password.' })
                }
            })
        }
    }

    else {
        res.status(400).json({ error: 'Wrong request method' })
    }

}