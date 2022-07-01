import connect from '../../utils/database'
import { ObjectId } from 'bson'
import bcrypt from 'bcrypt'

export default async function (req, res) {

    if (req.method === 'POST') {

        const { firstName, lastName, email, company_id, password, permissions, userStatus } = req.body

        const { db } = await connect()



        Date.prototype.addDays = function (days) {

            var date = new Date(this.valueOf());
            date.setDate(date.getDate() + days);
            return date;
        }

        let date = new Date()

        const user_id = ObjectId()

        const saltPassword = await bcrypt.genSalt(10)
        const securePassword = await bcrypt.hash(password, saltPassword)

        const response = await db.collection('users').insertOne({
            _id: user_id,
            firstName: firstName,
            lastName: lastName,
            cpf: '',
            email: email,
            celular: '',
            cep: '',
            logradouro: '',
            numero: '',
            cidade: '',
            estado: '',
            company_id: company_id,
            active: true,
            deleted: false,
            userStatus: userStatus,
            profileImageUrl: 'https://res.cloudinary.com/co2blue/image/upload/v1618519160/co2blue_profile_images/user_template_d4xng3.png',
            password: securePassword,
            permissions: permissions,
            dateAdd: new Date(),
            dateLimit: '',
            dateUpdated: '',
            accessCount: 0,
            passwordResetToken: '',
            passwordResetExpires: ''
        })

        res.status(200).json(response)

    } else {
        res.status(400).json({ error: 'Wrong paramter method' })
    }
}