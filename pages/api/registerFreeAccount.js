import connect from '../../utils/database'
import { ObjectId } from 'bson'
import bcrypt from 'bcrypt'

export default async function (req, res) {

    if (req.method === 'POST') {

        const { firstName, lastName, email, celular, password, emailCode, secureCode } = req.body

        const { db } = await connect()

        bcrypt.compare(emailCode, secureCode, async function (err, result) {
            if (!err && result) {

                Date.prototype.addDays = function (days) {

                    var date = new Date(this.valueOf());
                    date.setDate(date.getDate() + days);
                    return date;
                }

                let date = new Date()

                const user_id = ObjectId()

                const saltPassword = await bcrypt.genSalt(10)
                const securePassword = await bcrypt.hash(password, saltPassword)

                await db.collection('users').insertOne({
                    _id: user_id,
                    firstName: firstName,
                    lastName: lastName,
                    cpf: '',
                    email: email,
                    celular: celular,
                    cep: '',
                    logradouro: '',
                    numero: '',
                    cidade: '',
                    estado: '',
                    company_id: '',
                    userStatus: 'admGlobal',
                    profileImageUrl: 'https://res.cloudinary.com/co2blue/image/upload/v1618519160/co2blue_profile_images/user_template_d4xng3.png',
                    password: securePassword,
                    permissions: false,
                    dateAdd: new Date(),
                    dateLimit: date.addDays(8),
                    dateUpdated: '',
                    passwordResetToken: '',
                    passwordResetExpires: '',
                    accessCount: 0,
                    active: true,
                    deleted: false
                })

                res.status(200).json({ message: 'Usuário cadastrado com sucesso.' })

            } else {
                res.status(400).json({ message: 'The e-mail confirm code is wrong.' })
            }
        })

    } else {
        res.status(400).json({ error: 'Wrong paramter method' })
    }
}