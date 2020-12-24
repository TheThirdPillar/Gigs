import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'

import Container from 'react-bootstrap/Container'

import Topbar from '../components/Topbar'
import Footer from '../components/Footer'

import connectToExtension from '../utils/extension'

function DefaultLayout(props) {
    
    const router = useRouter()
    const [isShieldInstalled, toggleShieldIsInstalled] = useState(false)
    useEffect(() => {
        // Check if shield is installed
        if (!isShieldInstalled) {
          let request = {
            query: 'isExtensionAvailable'
          }
          connectToExtension(request)
          .then((response) => {
            if (response.status == 'SUCCESS') toggleShieldIsInstalled(true)
          })
        }
      }, [isShieldInstalled])
    
    const handleLogin = () => {
        let request = {}
        request['query'] = 'shieldLogin'
        request['applicationId'] = 'gigs'
        connectToExtension(request)
        .then((response) => {
            if (response.status === 'SUCCESS') {
                Cookies.set('token', response.token)
                props.setUserSession(true)
            }
        })
        .catch((error) => {
            console.log(error)
        })
    }

    const handleLogout = () => {
        let request = {}
        request['query'] = 'shieldLogout'
        request['applicationId'] = 'identity'
        connectToExtension(request)
        .then((response) => {
            if (response.status === 'SUCCESS') {
                Cookies.remove('token')
                router.push('/')
            }
        })
    }

    return (
        <Container>
            <Topbar isUserSession={props.isUserSession} setUserSession={(session) => props.toggleSesion(session)} isShieldInstalled={isShieldInstalled} handleLogin={handleLogin} handleLogout={handleLogout} />
            <div>
                {props.children}
            </div>
            {
                (!props.isUserSession) ? <Footer /> : <></>
            }
        </Container>
    )
}

export default DefaultLayout