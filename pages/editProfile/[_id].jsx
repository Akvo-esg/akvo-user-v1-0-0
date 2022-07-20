import axios from "axios"
import Router, { useRouter } from "next/router"
import { useEffect, useState } from 'react'
import Cropper from '../../src/components/cropper/Cropper'
import Link from 'next/link'
import Cookie from 'js-cookie'
import baseUrl from "../../utils/baseUrl"
import Title from '../../src/components/title/Title'
import EstadosList from "../../src/components/formComponets/EstadosList"
import sidebarHide from "../../utils/sidebarHide"
import jwt from "jsonwebtoken"

export default function EditProfile() {

    const token = jwt.decode(Cookie.get('auth'))

    const [firstName, setFirstName] = useState('')
    const [lastName, setlastName] = useState('')
    const [email, setEmail] = useState('')
    const [celular, setCelular] = useState('')
    const [cidade, setCidade] = useState('')
    const [estado, setEstado] = useState('')
    const [logradouro, setLogradouro] = useState('')
    const [numero, setNumero] = useState('')
    const [cep, setCep] = useState('')
    const [cpf, setCpf] = useState('')
    const [profileImageUrl, setProfileImageUrl] = useState('')
    const [previewSource, setPreviewSource] = useState('')
    const [saveLoading, setSaveLoading] = useState(false)
    const [loading, setLoading] = useState(true)
    const [emailError, setEmailError] = useState('')
    const [firstNameError, setFirstNameError] = useState('')

    const router = useRouter()
    const user_id = router.query._id

    useEffect(() => {
        sidebarHide()
        if (token.sub === user_id) {
            dataFunction()
        } else {
            Router.push('/')
        }
    }, [])



    const dataFunction = async () => {
        try {
            await axios.get(`${baseUrl()}/api/editProfile/${user_id}`)
                .then(res => {
                    setFirstName(res.data.firstName)
                    setlastName(res.data.lastName)
                    setEmail(res.data.email)
                    setCelular(res.data.celular)
                    setCidade(res.data.cidade)
                    setEstado(res.data.estado)
                    setLogradouro(res.data.logradouro)
                    setNumero(res.data.numero)
                    setCep(res.data.cep)
                    setCpf(res.data.cpf)
                    setProfileImageUrl(res.data.profileImageUrl)
                    setLoading(false)
                })
        } catch (e) {
            console.log(e)
        }
    }

    const onBlurCep = (event) => {

        const { value } = event.target

        const cep = value?.replace(/[^0-9]/g, '');

        if (cep?.length !== 8) {
            return;
        }

        axios.get(`https://viacep.com.br/ws/${value}/json/`)
            .then(res => {

                const data = res.data

                setLogradouro(data.logradouro)
                setCidade(data.localidade)
                setEstado(data.uf)
            })
    }

    const validate = async () => {

        let firstNameError = ''
        let emailError = ''

        if (!firstName) {
            firstNameError = 'Insira o nome do usuário'
        }


        if (!email || !email.includes('@')) {
            emailError = 'Email inválido'
        }


        if (emailError || firstNameError) {
            setEmailError(emailError)
            setFirstNameError(firstNameError)
            return false
        }

        return true

    }

    const maskCpf = (value) => {
        return setCpf(value
            .replace(/\D/g, '')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1-$2')
            .replace(/(-\d{2})\d+?$/, '$1'))
    }

    const maskCep = (value) => {
        return setCep(value
            .replace(/\D/g, '')
            .replace(/(\d{5})(\d)/, '$1-$2')
            .replace(/(-\d{3})\d+?$/, '$1'))
    }

    const maskTelefone = (value) => {
        return setCelular(value
            .replace(/\D/g, '')
            .replace(/(\d{2})(\d)/, '($1) $2')
            .replace(/(\d{4})(\d)/, '$1-$2')
            .replace(/(\d{4})-(\d)(\d{4})/, '$1$2-$3')
            .replace(/(-\d{4})\d+?$/, '$1'))
    }

    const save = async e => {
        e.preventDefault()

        const isValid = validate()

        if (isValid) {
            setSaveLoading(true)

            if (previewSource) {

                const formData = new FormData()
                formData.append("file", previewSource)
                formData.append("upload_preset", "co2blue_profile_images")

                await axios.post('https://api.cloudinary.com/v1_1/co2blue/image/upload', formData)
                    .then(res => {
                        save2(res.data.secure_url)
                    })
            } else {
                save2(profileImageUrl)
            }
        }
    }

    const save2 = async (ImageURL) => {
        const data = {
            firstName,
            lastName,
            cpf,
            cep,
            logradouro,
            numero,
            cidade,
            estado,
            email,
            celular,
            profileImageUrl: ImageURL,
            dateUpdate: new Date()
        }

        await axios.patch(`${baseUrl()}/api/editProfile/${user_id}`, data)
            .then(res => {
                setEmailError('')
                setFirstNameError('')
                setSaveLoading(true)
            })
            .catch(res => console.log(res))

        Cookie.remove('auth')
        localStorage.removeItem('auth')

        await axios.post(`${baseUrl()}/api/updateToken`, { user_id })
            .then(res => {
                localStorage.setItem('auth', (Cookie.get('auth')))
                window.location.href = baseUrl()
            })
    }

    return (

        <>
            <div>
                <Title title={'Editar Perfil'} subtitle={'Mantenha seu cadastro atualizado.'} backButton />

                {loading ?
                    <div className="d-flex justify-content-center mt-5">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                    :
                    <div className="pagesContent shadow fadeItem">

                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <div className="row">

                                        <div className="col-xxl-3 col-12 d-flex align-items-center">
                                            <Cropper onChange={e => setPreviewSource(e)} data={profileImageUrl} />

                                        </div>
                                        <div className="col">

                                            <div className="row">
                                                <div className="col-12">
                                                    <h5 className="h5_title">Dados de identificação</h5>
                                                </div>
                                            </div>

                                            <div className="form mt-1">
                                                <div className="row">
                                                    <div className="form-group col-12 col-xl-4 px-1">
                                                        <label className="akvo_form_label">Nome*</label>
                                                        <input type="text" className="form-control akvo_form_control_sm "
                                                            name="firstName" value={firstName}
                                                            onChange={e => setFirstName(e.target.value)} />
                                                        <small className="text-danger">{firstNameError}</small>
                                                    </div>

                                                    <div className="form-grup col-12 col-xl-4 px-1">
                                                        <label className="akvo_form_label">Sobrenome*</label>
                                                        <input type="text" className="form-control akvo_form_control_sm "
                                                            name="lastName" value={lastName}
                                                            onChange={e => setlastName(e.target.value)} />
                                                    </div>

                                                    <div className="form-grup col-12 col-xl-4 px-1">
                                                        <label className="akvo_form_label">CPF</label>
                                                        <input type="text" className="form-control akvo_form_control_sm "
                                                            name="cpf" value={cpf}
                                                            onChange={e => maskCpf(e.target.value)} />
                                                    </div>
                                                </div>

                                                <div className="row mt-3">
                                                    <div className="form-grup col-12 col-xl-2 px-1">
                                                        <label className="akvo_form_label">CEP</label>
                                                        <input type="text" className="form-control akvo_form_control_sm "
                                                            name="cep" value={cep}
                                                            onChange={e => maskCep(e.target.value)}
                                                            onBlur={e => onBlurCep(e)} />
                                                    </div>

                                                    <div className="form-grup col-12 col-xl-5 px-1">
                                                        <label className="akvo_form_label">Rua</label>
                                                        <input type="text" className="form-control akvo_form_control_sm "
                                                            id="rua"
                                                            name="logradouro" value={logradouro}
                                                            onChange={e => setLogradouro(e.target.value)} />
                                                    </div>

                                                    <div className="form-grup col-12 col-xl-2 px-1">
                                                        <label className="akvo_form_label">Número</label>
                                                        <input type="text" className="form-control akvo_form_control_sm "
                                                            name="numero" value={numero}
                                                            onChange={e => setNumero(e.target.value)} />
                                                    </div>
                                                    <div className="form-grup col-12 col-xl-2 px-1">
                                                        <label className="akvo_form_label">Cidade</label>
                                                        <input type="text" className="form-control akvo_form_control_sm "
                                                            id="cidade"
                                                            name="cidade" value={cidade}
                                                            onChange={e => setCidade(e.target.value)} />
                                                    </div>
                                                    <div className="form-grup col-12 col-xl-1 px-1">
                                                        <label className="akvo_form_label">Estado</label>
                                                        <EstadosList onChange={value => setEstado(value)} value={estado} />
                                                    </div>
                                                </div>

                                                <div className="row mt-3">
                                                    <div className="form-grup col-12 col-xl-6 px-1">
                                                        <label className="akvo_form_label">Email</label>
                                                        <input type="text" className="form-control akvo_form_control_sm "
                                                            name="email" value={email}
                                                            onChange={e => setEmail(e.target.value)} disabled />
                                                        <small className="text-danger">{emailError}</small>
                                                    </div>

                                                    <div className="form-grup col-12 col-xl-6 px-1">
                                                        <label className="akvo_form_label">Celular</label>
                                                        <input type="text" className="form-control akvo_form_control_sm "
                                                            name="celular" value={celular}
                                                            onChange={e => maskTelefone(e.target.value)} />
                                                    </div>
                                                </div>
                                            </div>


                                        </div>
                                    </div>
                                    <hr />

                                </div>
                                <div className="row">
                                    <div className="col-12 d-flex justify-content-end">
                                        {!saveLoading ?

                                            <button className="akvo_btn akvo_btn_primary btn-sm"
                                                id="salvarButton"
                                                onClick={save}>
                                                Salvar
                                            </button>
                                            :
                                            <button className="akvo_btn akvo_btn_primary btn-sm" type="button" disabled>
                                                <span className="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>
                                                Salvando...
                                            </button>
                                        }
                                        <Link href="/">
                                            <button type="button" className="akvo_btn akvo_btn_secondary btn-sm ms-2">
                                                Cancelar
                                            </button>
                                        </Link>
                                    </div>
                                </div>

                            </div>
                        </div>



                    </div>




                }

            </div>

        </>
    )
}