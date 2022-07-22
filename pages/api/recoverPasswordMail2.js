const mail = require('@sendgrid/mail')
import connect from '../../utils/database'
import crypto from 'crypto'
import { ObjectID } from 'bson'
import baseUrl from '../../utils/baseUrl'


mail.setApiKey(process.env.SENDGRIP_API_KEY_AKVO)

export default async function recoverPasswordMail(req, res) {

    const { user_id } = req.body

    const { db } = await connect()

    if (req.method === 'PATCH') {

        try {
            const userExists = await db.collection('users').findOne({ _id: ObjectID(user_id) })

            if (!userExists) {
                return res.status(400).json({ error: 'User not found.' })
            } else {
                const token = crypto.randomBytes(20).toString('hex')

                const now = new Date()
                now.setHours(now.getHours() + 1)

                await db.collection('users').updateOne({ _id: ObjectID(userExists._id) }, {
                    '$set': {
                        passwordResetToken: token,
                        passwordResetExpires: now
                    }
                })

                const data = {
                    to: userExists.email,
                    from: {
                        email: 'contato@akvo-esg.com.br',
                        name: 'Akvo-esg'
                    },
                    templateId: 'd-b29c330079b5443e9f7ee0415331a57b',
                    dynamic_template_data: {
                        firstName: userExists.firstName,
                        link: `${baseUrl()}/passwordRecover/params?id=${userExists._id}&token=${token}`
                    }
                }
                // console.log(data)

                mail.send(data)

                res.status(200).json({ message: "E-mail enviado." })
            }

        } catch {
            res.status(400).json({ error: 'Error, try again' })
        }
    }

}








// const mail = require('@sendgrid/mail')
// import bcrypt from 'bcrypt'
// import connect from '../../utils/database'

// mail.setApiKey(process.env.SENDGRID_API_KEY)

// export default async (req, res) => {

//     const body = JSON.parse(req.body);

//     const { db } = await connect()

//     const userEmail = body.email 

//     const emailExists = await db.collection('users').findOne({ userEmail })

//     if (!emailExists) {
//         res.status(400).json({ message: 'Usuário não cadastrado cadastrado.' })
//     } else {

//         const randomPassword = len => {
//             let passwd = ''
//             do {
//                 passwd += Math.random().toString(36).substr(2)
//             } while (passwd.length < len)
//             passwd = passwd.substr(0, len)
//             return passwd
//         }


//         const code = randomPassword(5)

//         const saltCode = await bcrypt.genSalt(10)
//         const secureCode = await bcrypt.hash(code, saltCode)

//         const data = {
//             to: body.email,
//             from: {
//                 email: 'contato@co2azul.com.br',
//                 name: 'CO2Azul'
//             },
//             templateId: 'd-4fc58139b53b41fcb00cfa909f2e03a8',
//             dynamic_template_data: {
//                 firstName: body.firstName,
//                 link: link
//             }
//         }

//         mail.send(data)

//         res.status(200).json({ code: secureCode })

//     }

// }