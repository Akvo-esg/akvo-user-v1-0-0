const mail = require('@sendgrid/mail')
import bcrypt from 'bcrypt'
import connect from '../../utils/database'

mail.setApiKey(process.env.SENDGRIP_API_KEY_AKVO)

export default async (req, res) => {

    const body = JSON.parse(req.body);
    
    const { db } = await connect()
    
    const userEmail = body.email
    const emailExists = await db.collection('users').findOne({ userEmail })
    
    if (emailExists) {
        res.status(400).json({ message: 'E-mail já cadastrado.' })
    } else {
        const randomPassword = len => {
            let passwd = ''
            do {
                passwd += Math.random().toString(36).substr(2)
            } while (passwd.length < len)
            passwd = passwd.substr(0, len)
            return passwd.toUpperCase()
        }
        const code = randomPassword(5)

        const saltCode = await bcrypt.genSalt(10)
        const secureCode = await bcrypt.hash(code, saltCode)

        const data = {
            to: body.email,
            from: {
                email: 'contato@akvo-esg.com.br',
                name: 'Akvo-esg'
            },
            templateId: 'd-47b234272a1e49bcab7385e30b3dbc7d',
            dynamic_template_data: {
                firstName: body.firstName,
                code: code
            }
        }

        await mail.send(data)

        res.status(200).json({ code: secureCode })

    }

}