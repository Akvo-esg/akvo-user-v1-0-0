const mail = require('@sendgrid/mail')

mail.setApiKey(process.env.SENDGRIP_API_KEY_AKVO)

export default async (req, res) => {

    const body = JSON.parse(req.body);

    const data = {
        to: body.email,
        from: {
            email: 'contato@akvo-esg.com.br',
            name: 'Akvo-esg'
        },
        templateId: 'd-ab358be34f144666a754b9ad17f27c65',
        dynamic_template_data: {
            unidName: body.unidName,
            link: body.link
        }
    }

    await mail.send(data)

    res.status(200).json({ message: 'E-mail sent' })

}