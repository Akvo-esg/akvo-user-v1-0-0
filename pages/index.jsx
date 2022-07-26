import Head from 'next/head'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import Title from '../src/components/title/Title'
import Cookie from 'js-cookie'
import jwt from 'jsonwebtoken'
import Link from 'next/link'
import $ from 'jquery'
import axios from 'axios'
import baseUrl from '../utils/baseUrl'
import sidebarHide from "../utils/sidebarHide";
import { useSelector } from 'react-redux'
import { Accordion } from 'react-bootstrap'


if (typeof window !== "undefined") {
  const bootstrap = require("bootstrap");
}



export default function Home() {

  const token = jwt.decode(Cookie.get('auth'))


  const [userFirstName, setUserFirstName] = useState('')

  const [userProfilePicture, setUserProfilePicture] = useState(null)
  const [userId, setUserId] = useState(null)
  const [perfilNot, setPerfilNot] = useState(false)
  const [cadastroInstNot, setCadastroInstNot] = useState(false)
  const [firstUnityNot, setFirstUnityNot] = useState(false)
  const [tutorialNot, setTutorialNot] = useState(false)
  const [dateFreeAcoount, setDateFreeAccount] = useState(null)

  const [activeId, setActiveId] = useState('0');


  useEffect(() => {
    sidebarHide()
    dataFunction(token.sub)
  }, [])


  const dataFunction = async (userId) => {
    if (token) {
      const data = {
        "_id": userId
      }
      await axios.post(`${baseUrl()}/api/getUserInfo`, data)
        .then(res => {
          setPerfilNot(res.data.notifications.perfilNot)
          setCadastroInstNot(res.data.notifications.cadastroInst)
          setFirstUnityNot(res.data.notifications.firstUnity)
          setTutorialNot(res.data.notifications.tutorial)
          setDateFreeAccount(res.data.notifications.freeAccount)
        })
        .catch(e => console.log('error'))
    } else {
      return
    }
  }

  // const unsetTokem = (e) => {
  //   e.preventDefault()

  //   Cookie.remove('auth')
  //   localStorage.removeItem('auth')
  //   router.push('/premiumAccount')
  // }

  useEffect(() => {
    if (perfilNot || cadastroInstNot || dateFreeAcoount) {
      var toastElList = [].slice.call(document.querySelectorAll('.toast'))
      var toastList = toastElList.map(function (toastEl) {
        // Creates an array of toasts (it only initializes them)
        return new bootstrap.Toast(toastEl, { autohide: false }) // No need for options; use the default options
      });
      toastList.forEach(toast => toast.show()); // This show them
    } else {
      return
    }
  }, [perfilNot, cadastroInstNot, dateFreeAcoount])

  return (

    <div>
      <Title title={`Olá, ${token.firstName}!`} subtitle={'Qual sua meta de sustentabilidade para hoje?'} />

      <h5>{token.userConfig}</h5>


















      <div class="position-fixed bottom-0 end-0 p-3" style={{ "z-index": "11" }}>


        {perfilNot && (
          <div class="toast" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header">
              <strong className="me-auto h5_modal">Bem vindo!</strong>
              <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div className="toast-body">
              Clique <Link href={`/editProfile/${token.sub}`}>aqui</Link> para completar os dados do seu perfil.
            </div>
          </div>
        )}
        {cadastroInstNot && (
          <div className="toast fadeItem" role="alert" aria-live="assertive" aria-atomic="true">
            <div className="toast-header">

              <strong className="me-auto h5_modal">Adicione sua instituição!</strong>
              <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div className="toast-body">
              Para realizar o seu invetário você precisa completar o cadastro da sua instituição.
              Clique <Link href={`/companyEdit`}>aqui</Link> para realizar o cadastro.
            </div>
          </div>
        )}
        {!cadastroInstNot && firstUnityNot && (
          <div className="toast fadeItem" role="alert" aria-live="assertive" aria-atomic="true">
            <div className="toast-header">

              <strong className="me-auto h5_modal">Cadastre suas unidades</strong>
              <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div className="toast-body">
              É possível cadastrar unidades blablabla nesse link <Link href={'/unityAdd'}>aqui</Link>
            </div>
          </div>
        )}
        {tutorialNot && (
          <div className="toast fadeItem" role="alert" aria-live="assertive" aria-atomic="true">
            <div className="toast-header">

              <strong className="me-auto h5_modal">Tutoriais</strong>
              <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div className="toast-body">
              Acesse a <Link href={'/tutorials'}>página de tutoriais</Link> para blablabla... A página de tutoriais também pode ser encontrada no menu lateral em &quot;Referências&quot;
            </div>
          </div>
        )}
        {dateFreeAcoount && (
          <div className="toast fadeItem" role="alert" aria-live="assertive" aria-atomic="true">
            <div className="toast-header">

              <strong className="me-auto h5_modal">Restam {dateFreeAcoount} dias para acabar sua licença gratuita.</strong>
              <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div className="toast-body">
              Clique <Link href={'/pricing'}>aqui</Link> para adquirir uma conta premium.
            </div>
          </div>
        )}
      </div>






    </div>
  )
}
