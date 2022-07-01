
import connect from '../../utils/database'
import { ObjectId } from 'mongodb'
import { sign } from 'jsonwebtoken'
import cookie from 'cookie'


export default async (req, res) => {

    if (req.method === 'POST') {

        const { user_id } = req.body

        const { db } = await connect()

        const person = await db.collection('users').findOne({ _id: ObjectId(user_id) })

        const clains = {
            sub: person._id,
            firstName: person.firstName,
            lastName: person.lastName,
            company_id: person.company_id,
            profilePicture: person.profileImageUrl,
            userStatus: person.userStatus,
            dateLimit:person.dateLimit
        }

        const jwt = sign(clains, process.env.JWT_SECRET, {})

        const response = res.setHeader('Set-Cookie', cookie.serialize('auth', jwt, {
            httpOnly: false,
            secure: process.env.NODE_ENV !== 'development', //em produção usar true
            sameSite: 'strict',
            maxAge: 3600,
            path: '/'
        }))
        res.status(200).json({ message: 'Ok' })
    }

    else {

        res.status(400).json({ error: 'Wrong request method' })
    }

}