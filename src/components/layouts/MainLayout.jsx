import Head from 'next/head'
//import styles from '../styles/Home.module.css'
import Logo from '../template/Logo'
import Header from '../template/Header'
import Nav from '../template/Nav'
import { Scrollbars } from 'react-custom-scrollbars-2';


export default function Layout({ children }) {
    return (
        <div className='app layout'>
            <Head>
                <title>Akvo</title>
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
                <link rel="icon" href="favicon.ico" />
            </Head>
            <Scrollbars style={{ height: "100vh", weight: "100vw" }} autoHide autoHideTimeout={1000} autoHideDuration={500}>
                <div className="pages" id="pages">
                    {children}
                </div>
            </Scrollbars>

            <Nav />
            <Logo />
            <Header />

        </div >
    )
}